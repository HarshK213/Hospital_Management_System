import { Router } from "express";
import { 
  viewLabRequest, 
  collectSample, 
  updateTestStatus, 
  enterTestResult, 
  uploadTestReport 
} from "../controllers/lab_technician.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/requests").get(verifyJWT, viewLabRequest);
router.route("/sample/:requestId").post(verifyJWT, collectSample);
router.route("/status/:requestId").put(verifyJWT, updateTestStatus);
router.route("/result/:requestId").post(verifyJWT, enterTestResult);
router.route("/report/:requestId").post(verifyJWT, uploadTestReport);

export default router;
