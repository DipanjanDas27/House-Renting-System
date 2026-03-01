import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

import { getCurrentUser, updateProfile, updateProfileImage, deleteAccount } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", verifyAuth, getCurrentUser);
router.patch("/me/updateprofile", verifyAuth, updateProfile);
router.patch("/me/image", verifyAuth, upload.single("profileImage"), updateProfileImage);
router.get("/:userId", verifyAuth, requireRole("owner", "tenant"), getCurrentUser);
router.delete("/:userId", verifyAuth, deleteAccount);

export default router;