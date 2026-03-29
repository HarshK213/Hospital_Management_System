import { Router } from "express";
import { 
  assignBed, 
  updateBed, 
  trackAdmission, 
  assignNurse 
} from "../controllers/in-patient_manager.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/bed/assign").post(verifyJWT, assignBed);
router.route("/bed/:bedId").put(verifyJWT, updateBed);
router.route("/admissions").get(verifyJWT, trackAdmission);
router.route("/ward/:wardId/nurse").post(verifyJWT, assignNurse);

export default router;
