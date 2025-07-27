import crypto from 'crypto';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtpEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Verification Code',
        text: `Your OTP verification code is: ${otp}. It will expire in 5 minutes.`,
    };

    return transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (email, resetPasswordLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Please click the following link to reset your password: ${resetPasswordLink}`,
    };

    await transporter.sendMail(mailOptions);
}
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};
const generateResetToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

export { generateOtp, sendOtpEmail, sendResetPasswordEmail, generateResetToken };