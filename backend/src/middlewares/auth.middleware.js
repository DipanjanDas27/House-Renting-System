import { verifyAccessToken } from "../utils/token.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { getUserById } from "../models/user.model.js";

export const verifyAuth = asyncHandler(async (req, res, next) => {

  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "")

  if (!token) throw new ApiError(401, "Unauthorized request")

  let decoded
  try {
    decoded = verifyAccessToken(token)
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired")
    }
    throw new ApiError(401, "Invalid access token")
  }

  const user = await getUserById(decoded.id)

  if (!user) throw new ApiError(401, "Invalid token")

  req.user = {
    id: user.id,
    email: user.email,
    role: user.role,
  }

  next()
})