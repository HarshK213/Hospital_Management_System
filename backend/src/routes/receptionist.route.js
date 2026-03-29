import { Router } from "express";
import { 
  registerPatient, 
  bookAppointment, 
  updateAppointment, 
  // admitEntry, 
  viewPatientProfile, 
  generateOPDBill 
} from "../controllers/receptionist.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/patient/register").post(verifyJWT, registerPatient);
router.route("/appointment/book").post(verifyJWT, bookAppointment);
router.route("/appointment/:appointmentId").put(verifyJWT, updateAppointment);
// router.route("/admit").post(verifyJWT, admitEntry);
router.route("/patient/:patientId").get(verifyJWT, viewPatientProfile);
router.route("/bill/opd").post(verifyJWT, generateOPDBill);

export default router;
