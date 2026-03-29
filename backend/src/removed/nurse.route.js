import { Router } from "express";
import { 
  viewPatientProfile, 
  viewPatientMedicalHistory, 
  recordNursingNote, 
  updatePatientStatus 
} from "./nurse.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/patient/:patientId").get(verifyJWT, viewPatientProfile);
router.route("/patient/:patientId/medical-history").get(verifyJWT, viewPatientMedicalHistory);
// router.route("/nursing-note/:admissionId").post(verifyJWT, recordNursingNote);
// router.route("/patient/:admissionId/status").put(verifyJWT, updatePatientStatus);

export default router;
