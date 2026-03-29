import { Router } from "express";
import { addStaff, staffStatus, viewMedicalHistory, viewReport } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/add-staff").post(verifyJWT, addStaff);
router.route("/staff-status/:staffId").put(verifyJWT, staffStatus);
router.route("/medical-history/:patientId").get(verifyJWT, viewMedicalHistory);
router.route("/reports/:patientId").get(verifyJWT, viewReport);

export default router;
