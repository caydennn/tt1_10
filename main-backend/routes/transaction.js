import { Router } from "express";
import { getTransactions, getTransaction } from "../controllers/transaction.js";
// require("../controllers/transaction")
const router = Router();

// R
router.get("/", getTransactions);
router.get("/:id", getTransaction);

export default router;
