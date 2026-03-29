import { Router } from "express";
import { StaffLogin, loginPatient, getCurrentUser, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/staff-login").post(StaffLogin);
router.route("/patient-login").post(loginPatient);
router.route("/get-curr-user").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logout);

export default router;
