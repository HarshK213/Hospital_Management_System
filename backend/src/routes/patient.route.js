import { Router } from "express";
import { 
  registerPatient, 
  verifyUser, 
  loginPatient, 
  bookAppointment, 
  listAllDoctor,
  viewAllBill, 
  viewBill, 
  viewMedicalHistory, 
  viewPaymentHistory, 
  viewReport, 
  downloadReport, 
  updateDetails 
} from "../controllers/patient.controller.js";
import { verifyPatientJWT } from "../middleware/patientAuth.middleware.js";

const router = Router();

router.route("/register").post(registerPatient);
router.route("/verify").get(verifyUser);
router.route("/login").post(loginPatient);
router.route("/doctors").get(listAllDoctor);

router.route("/appointment").post(verifyPatientJWT, bookAppointment);
router.route("/bills").get(verifyPatientJWT, viewAllBill);
router.route("/bill/:billId").get(verifyPatientJWT, viewBill);
router.route("/medical-history").get(verifyPatientJWT, viewMedicalHistory);
router.route("/payments").get(verifyPatientJWT, viewPaymentHistory);
router.route("/reports").get(verifyPatientJWT, viewReport);
router.route("/report/:reportId").get(verifyPatientJWT, downloadReport);
router.route("/update").put(verifyPatientJWT, updateDetails);

export default router;
