import { asyncHandler } from "../utiles/asyncHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utiles/ApiResponse.js";
import jwt from "jsonwebtoken"
import { generateOtp, generateResetToken, sendOtpEmail, sendResetPasswordEmail } from "../utiles/otpService.js";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const verifyOtp = asyncHandler(async (req, res) => {
    const { otp, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
        return ApiError(res, 404, "User not found");
    }

    if (user.isOtpVerified) {
        return res.status(400).json(new ApiResponse(400, {}, "OTP already verified"));
    }

    // Check if OTP is correct and expired
    if (user.otp !== otp) {
        return ApiError(res, 400, "Invalid OTP");
    }

    if (new Date() > new Date(user.otpExpiry)) {
        return ApiError(res, 400, "OTP has expired");
    }

    // OTP is valid, update user's status
    user.isOtpVerified = true;
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));
});

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, mobileNumber, password } = req.body;
    if ([fullName, email, mobileNumber, password].some(item => item?.trim() === "")) {
        return ApiError(res, 400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ mobileNumber }, { email }]
    })
    if (existedUser) {
        return ApiError(res, 409, "User with email or mobile number already exists")
    }
    const user = await User.create({
        fullName,
        email,
        password,
        mobileNumber
    })

    // Generate OTP
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expiry time (5 minutes)

    // Save OTP and expiry time to the user document
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    await sendOtpEmail(user.email, otp);

    const createdUser = await User.findById(user._id).select(
        "-password  -refreshToken  -otp  -otpExpiry"
    )
    if (!createdUser) {
        return ApiError(res, 500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully and OTP send")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, mobileNumber, password } = req.body
    if (!email && !mobileNumber) {
        return ApiError(res, 400, "Mobile number or email is required")
    }
    const user = await User.findOne({ $or: [{ mobileNumber }, { email }] })
    if (!user) {
        return ApiError(res, 404, "User does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        return ApiError(res, 401, "Invalid user credentials")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken  -otp  -otpExpiry")
    const options = {
        httpOnly: true,
        secure: true
    }
    if (!loggedInUser.isOtpVerified) {
        // Generate OTP
        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expiry time (5 minutes)

        // Save OTP and expiry time to the user document
        loggedInUser.otp = otp;
        loggedInUser.otpExpiry = otpExpiry;
        await loggedInUser.save();

        // Send OTP email
        await sendOtpEmail(loggedInUser.email, otp);

        return res.status(201).json(
            new ApiResponse(200, { user: loggedInUser }, "Verify your email address OTP sended")
        )
    }
    return res
        .status(200)
        // .cookie("accessToken", accessToken, options)
        // .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: null } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json(new ApiResponse(404, {}, "User not found"));
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json(new ApiResponse(500, {}, "Internal server error"));
    }
    // await User.findByIdAndUpdate(
    //     req.user._id,
    //     {
    //         $set: {
    //             refreshToken: undefined
    //         }
    //     },
    //     {
    //         new: true
    //     }
    // )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        // .clearCookie("refreshToken", options)
        // .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(401, "Invalid refresh Token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)
        return res
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password")
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false })
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Change Successfully"))

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200,
            req.user,
            "Current user Fetched successfully"
        ))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body
    if (!fullName, !email) {
        throw new ApiError(400, "All fields are required");
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName: fullName,
                email: email
            }
        },
        { new: true }
    ).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return ApiError(res, 400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        return ApiError(res, 404, "User with this email does not exist");
    }

    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetPasswordLink = `${process.env.FRONTEND_URL}/login/reset-password/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetPasswordLink);

    return res.status(200).json(new ApiResponse(200, {}, "Password reset link has been sent to your email"));
});

const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
        return ApiError(res, 400, "Reset token and new password are required");
    }

    const user = await User.findOne({ resetPasswordToken: resetToken });
    if (!user) {
        return ApiError(res, 404, "Invalid reset token");
    }

    if (new Date() > new Date(user.resetPasswordTokenExpiry)) {
        return ApiError(res, 400, "Reset token has expired");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Password has been reset successfully"));
});

export {
    registerUser, loginUser, logoutUser, refreshAccessToken,
    changeCurrentPassword, getCurrentUser, updateAccountDetails,
    verifyOtp, forgotPassword, resetPassword
}