import { Router } from "express";
import { getAllAccounts, getAccount, createAccount } from "../controllers/accountController.js"

const router = Router()

router.get("/:username", getAccount)
router.get("/", getAllAccounts)
export default router;