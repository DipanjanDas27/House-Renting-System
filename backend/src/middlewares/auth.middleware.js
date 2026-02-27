import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { verifyAccessToken } from "../utils/token.js";
import { getUserById } from "../models/user.model.js";

export const verifyAuth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  let decoded;
  let user;

  try {
    decoded = verifyAccessToken(token);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }

  if (decoded.role === "tenant") {
    user = await getUserById(decoded._id);
    if (!user) throw new ApiError(401, "Invalid token");
    req.tenant = user;
  } 
  else if (decoded.role === "owner") {
    user = await getUserById(decoded._id);
    if (!user) throw new ApiError(401, "Invalid token");
    req.owner = user;
  }
  else {
    throw new ApiError(401, "Invalid token");
  }
  next();
});