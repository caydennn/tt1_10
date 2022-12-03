import { Router } from "express";
import { getAllAccounts, getAccount, createAccount } from "../controllers/accountController.js"
import {accountCreation} from "../validations/account.js"


const router = Router()

router.get("/", getAllAccounts)
router.get("/:account_id", getAccount)
router.post("/",accountCreation, createAccount)
export default router;