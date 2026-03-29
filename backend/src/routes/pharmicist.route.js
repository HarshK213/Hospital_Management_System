import { Router } from "express";
import { 
  viewInventory, 
  dispatchMedicine, 
  generateMedicineBill, 
  trackStock, 
  updateMedicines 
} from "../controllers/pharmicist.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/inventory").get(verifyJWT, viewInventory);
router.route("/dispatch").post(verifyJWT, dispatchMedicine);
router.route("/bill/medicine").post(verifyJWT, generateMedicineBill);
router.route("/stock/track").get(verifyJWT, trackStock);
router.route("/medicine/:medicineId").put(verifyJWT, updateMedicines);

export default router;
