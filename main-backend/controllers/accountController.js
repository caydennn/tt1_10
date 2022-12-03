import Account from "../models/account.js";
import { validationResult } from "express-validator"
import {createError} from "../utils/createError.js"
import { logSuccess } from "../utils/logger.js";

export const getAllAccounts = async (req, res, next) => {
    const username = req.user
    try {
        const allAccounts = await Account.find({ user_id: username })
        res.status(200).json(allAccounts)
    } catch (error) {
        next(err);      
        console.log(err)  
    }
}

export const getAccount = async (req, res, next) => {
    logSuccess("getting account")

    const {account_id} = req.params
    try {
        const account = await Account.findById(account_id)        
        res.status(200).json(account)
    } catch (error) {
        next(err);        
    }
}

export const createAccount = async (req, res, next) => {
    logSuccess("creating account")
    try {
        // validating schema
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // get the first error and just show that
            return next(createError(400, errors.array()[0].msg))          
        }     
        const user_id = req.user            

        const {account_type} = req.body    
        const newAccount = new Account({ user_id: user_id, account_type: account_type, account_balance: 0 });
        const resp = await newAccount.save();

        res.status(200).json(resp);
    } catch (err) {
        next(err);
    }
};