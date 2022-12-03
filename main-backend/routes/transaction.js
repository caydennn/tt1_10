import { Router } from "express";
import { getTransactions, getTransaction } from "../controllers/transaction.js";
// require("../controllers/transaction")
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction_cud.js";
const router = Router();

// R
router.get("/", getTransactions);
router.get("/:id", getTransaction);

router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
