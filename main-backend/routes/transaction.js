import { Router } from "express";
import { createTransaction, updateTransaction, deleteTransaction } from "../controllers/transaction_cud.js";
const router = Router()
router.post('/', createTransaction)
router.put('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)