import { post } from './apiMethods';

// login
export const loginUsers = (data) => post('/users/login', data);

// signup
export const registerUsers = (data) => post('/users/register', data);

// otp
export const otpVerifyApi = (data) => post('/users/verify-otp', data);

// forgot-password
export const forgotPassword = (data) => post('/users/forgot-password', data);

// reset-password
export const resetPassword = (data) => post('/users/reset-password', data);