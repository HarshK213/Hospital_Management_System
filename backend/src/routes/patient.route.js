import { Router } from "express";
import { 
  registerPatient, 
  verifyUser, 
  // loginPatient, 
  bookAppointment, 
  listAllDoctor,
  viewAllBill, 
  viewBill, 
  viewMedicalHistory, 
  viewPaymentHistory, 
  // viewReport, 
  // downloadReport, 
  updateDetails 
} from "../controllers/patient.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/register").post(registerPatient);
router.route("/verify").get(verifyUser);
// router.route("/login").post(loginPatient);
router.route("/doctors").get(listAllDoctor);

router.route("/appointment").post(verifyJWT, bookAppointment);
router.route("/bills").get(verifyJWT, viewAllBill);
router.route("/bill/:billId").get(verifyJWT, viewBill);
router.route("/medical-history").get(verifyJWT, viewMedicalHistory);
router.route("/payments").get(verifyJWT, viewPaymentHistory);
// router.route("/reports").get(verifyJWT, viewReport);
// router.route("/report/:reportId").get(verifyJWT, downloadReport);
router.route("/update").put(verifyJWT, updateDetails);

export default router;
