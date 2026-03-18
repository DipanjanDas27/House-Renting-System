import jwt from "jsonwebtoken"
import { ApiError } from "./apiError.js"

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )
}

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
}

export const generateResetToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, purpose: "password_reset" },
    process.env.RESET_TOKEN_SECRET,
    { expiresIn: process.env.RESET_TOKEN_EXPIRY }
  )
}

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired")
    }
    throw new ApiError(401, "Invalid access token")
  }
}

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Refresh token expired")
    }
    throw new ApiError(401, "Invalid refresh token")
  }
}

export const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, process.env.RESET_TOKEN_SECRET)
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Reset token expired")
    }
    throw new ApiError(401, "Invalid reset token")
  }
}