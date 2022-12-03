import { Router } from "express";
import { getAllAccounts, getAccount, createAccount } from "../controllers/accountController.js"

const router = Router()

router.get("/:account_id", getAccount)
router.get("/", getAllAccounts)
router.post("/", createAccount)
export default router;