import { Router } from "express";
import {
  addStaff,
  staffStatus,
  getStaffByUserId,
  deleteStaff,
  viewMedicalHistory,
  allStaff,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/add-staff").post(verifyJWT, addStaff);
router.route("/staff-status/:staffId").put(verifyJWT, staffStatus);
router.route("/staff/user-id/:userId").get(verifyJWT, getStaffByUserId);
router.route("/staff/:staffId").delete(verifyJWT, deleteStaff);
router.route("/medical-history/:patientId").get(verifyJWT, viewMedicalHistory);
router.route("/staff").get(verifyJWT, allStaff);

export default router;
