import { Router } from "express";
import { getAllAccounts, getAccount, createAccount } from "../controllers/accountController.js"

const router = Router()

router.get("/", getAllAccounts)
router.get("/:account_id", getAccount)
router.post("/", createAccount)
export default router;