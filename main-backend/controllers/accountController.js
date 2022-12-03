import Account from "../models/account.js";
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
    console.log("getting account")

    const {account_id} = req.params
    try {
        const account = await Account.findById(account_id)        
        res.status(200).json(account)
    } catch (error) {
        next(err);        
    }
}

export const createAccount = async (req, res, next) => {
    console.log("creating account")
    try {

        const user_id = req.user            
        //currently logged in admin
        const {account_type} = req.body    
        const newAccount = new Account({ user_id: user_id, account_type: account_type, account_balance: 0 });
        const resp = await newAccount.save();
        // we can only destructure ._doc otherwise we need to find and deselet
        // const { password, ...others } = newAdmin._doc;

        res.status(200).json(resp);
    } catch (err) {
        next(err);
    }
};