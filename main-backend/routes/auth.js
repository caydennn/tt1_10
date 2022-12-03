import express from "express";
import { userLoggedIn } from "../middleware/userLoggedIn.js"
import { registerUserSchemaValidation, loginUserSchemaValidation } from "../validations/auth.js"

import {    
    createUser,
    userLogin,
    userLoggedOut
} from "../controllers/auth.js";

const router = express.Router();

//Admin Login

router.post("/register", registerUserSchemaValidation, createUser)
router.post("/login", loginUserSchemaValidation, userLogin)
router.post("/logout", userLoggedIn, userLoggedOut)

export default router;