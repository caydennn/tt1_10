import User from "../models/user.js";
import Account from "../models/account.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { createError } from "../utils/createError.js";
import { validationResult } from "express-validator"

// create new user
export const createUser = async (req, res, next) => {
    try {

        // validating schema
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // get the first error and just show that
            return next(createError(400, errors.array()[0].msg))
        }        

        const { username }     = req.body             
        
        const existingUser = await User.findOne({ username: username })

        // if admin with the same username already exist we return error
        if (existingUser){
            return next(createError(403, `User with username ${username} already exist !`));
        }

        const { password:reqPassword } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(reqPassword, salt);
        const newUser = new User({ ...req.body, password: hash});
        await newUser.save();
        // we can only destructure ._doc otherwise we need to find and deselet
        const { password, ...others } = newUser._doc;

        // setting up three accounts by default
        const newSavingsAccount = new Account({ user_id: newUser.username, account_type: "SAVING", account_balance: Math.floor(Math.random() * 100000) });
        const newCurrentAccount = new Account({ user_id: newUser.username, account_type: "CURRENT", account_balance: Math.floor(Math.random() * 100000) });
        const newMultiAccount   = new Account({ user_id: newUser.username, account_type: "MULTIPLIER", account_balance: Math.floor(Math.random() * 100000) });

        await newSavingsAccount.save()
        await newCurrentAccount.save()
        await newMultiAccount.save()

        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
};

export const userLogin = async (req, res, next) => {
    try {

        // validating schema
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // get the first error and just show that
            return next(createError(400, errors.array()[0].msg))
        }        
        
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign({ username: user.username }, process.env.JWT);
        const { password, ...others } = user._doc;

        res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(others);
    } catch (err) {
        next(err);
    }
};

export const userLoggedOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).end()
    } catch (error) {
        next(error)
    }
}