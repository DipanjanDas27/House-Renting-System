import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { strictLimiter } from "../middlewares/rateLimiter.js";

import {
  createProperty,
  getFilteredProperties,
  getProperty,
  getOwnerProperties,
  updateProperty,
  updatePropertyImage,
  deleteProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

router.post("/", verifyAuth, requireRole("owner"), strictLimiter, upload.single("image"), createProperty);
router.get("/", getFilteredProperties);
router.get("/owner/:ownerId", verifyAuth, requireRole("owner"), getOwnerProperties);
router.get("/:propertyId", getProperty);
router.patch("/:propertyId", verifyAuth, requireRole("owner"), updateProperty);
router.patch("/:propertyId/image", verifyAuth, requireRole("owner"), upload.single("image"), updatePropertyImage);
router.delete("/:propertyId", verifyAuth, requireRole("owner"), deleteProperty);

export default router;