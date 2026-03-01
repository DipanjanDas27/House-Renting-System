import { ApiError } from "../utils/apiError.js";

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }

    next();
  };
};

