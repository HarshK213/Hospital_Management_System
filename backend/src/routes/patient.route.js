import { Router } from "express";
import { 
  registerPatient, 
  verifyUser, 
  resendVerificationEmail,
  // loginPatient, 
  bookAppointment, 
  listAllDoctor,
  viewAllBill, 
  viewBill, 
  viewMedicalHistory, 
  viewPaymentHistory, 
  // viewReport, 
  // downloadReport, 
  updateDetails,
  getPatientByIdForDoctor,
  searchPatientByUsername
} from "../controllers/patient.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/register").post(registerPatient);
router.route("/verify").post(verifyUser);
router.route("/resend-verify").post(resendVerificationEmail);
// router.route("/login").post(loginPatient);
router.route("/doctors").get(listAllDoctor);
router.route("/search").get(verifyJWT, searchPatientByUsername);

router.route("/appointment").post(verifyJWT, bookAppointment);
router.route("/bills").get(verifyJWT, viewAllBill);
router.route("/bill/:billId").get(verifyJWT, viewBill);
router.route("/medical-history").get(verifyJWT, viewMedicalHistory);
router.route("/payments").get(verifyJWT, viewPaymentHistory);
// router.route("/reports").get(verifyJWT, viewReport);
// router.route("/report/:reportId").get(verifyJWT, downloadReport);
router.route("/update").put(verifyJWT, updateDetails);
router.route("/:patientId").get(verifyJWT, getPatientByIdForDoctor);

export default router;
