import { Router } from "express";
import { 
  patientProfile, 
  patientMedicalHistory, 
  // labReport, 
  addMedicalRecord, 
  // requestLabTest, 
  seeAppointment, 
  // approveDischarge 
} from "../controllers/doctor.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/patient/:patientId").get(verifyJWT, patientProfile);
router.route("/patient/medical-history/:patientId").get(verifyJWT, patientMedicalHistory);
// router.route("/patient/:patientId/lab-reports").get(verifyJWT, labReport);
router.route("/patient/medical-record/:patientId").post(verifyJWT, addMedicalRecord);
// router.route("/patient/:patientId/lab-test").post(verifyJWT, requestLabTest);
router.route("/appointments").get(verifyJWT, seeAppointment);
// router.route("/admission/:admissionId/discharge").post(verifyJWT, approveDischarge);

export default router;
