import { Router } from "express";
import { 
    addStaff, 
    staffStatus, 
    getStaffByUserId,
    deleteStaff,
    viewMedicalHistory,
    // viewReport 
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/add-staff").post(verifyJWT, addStaff);
router.route("/staff-status/:staffId").put(verifyJWT, staffStatus);
router.route("/staff/user-id/:userId").get(verifyJWT, getStaffByUserId);
router.route("/staff/:staffId").delete(verifyJWT, deleteStaff);
router.route("/medical-history/:patientEmail").get(verifyJWT, viewMedicalHistory);

export default router;
