import { Router } from "express";
import { 
  updateInventory, 
  trackStockTransaction, 
  manageSupplier, 
  issueItem 
} from "../controllers/store_manager.controller.js";
import { verifyJWT } from "../middleware/auth.midlleware.js";

const router = Router();

router.route("/inventory/:itemId").put(verifyJWT, updateInventory);
router.route("/transaction").post(verifyJWT, trackStockTransaction);
router.route("/supplier").post(verifyJWT, manageSupplier);
router.route("/supplier/:supplierId").put(verifyJWT, manageSupplier);
router.route("/issue").post(verifyJWT, issueItem);

export default router;
