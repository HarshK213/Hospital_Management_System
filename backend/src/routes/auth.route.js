import { Router } from "express";
import { StaffLogin } from "../controllers/auth.controller.js";

const router = Router();

router.route("/staff-login").post(StaffLogin);

export default router;
