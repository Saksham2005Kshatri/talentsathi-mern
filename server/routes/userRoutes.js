import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
  getUpdateForm,
  updateProfile,
  deleteProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getProfile);
router.route("/profile/update").get(protect, getUpdateForm);
router.route("/profile/update").put(protect, updateProfile);
router.route("/profile").delete(protect, deleteProfile);

export default router;
