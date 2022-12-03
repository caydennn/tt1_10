import Account from "../models/account.js";
export const getAllAccounts = async (req, res, next) => {
    const username = req.users
    try {
        const allAccounts = await Account.find().find({ user_id: username })
        res.status(200).json(allAccounts)
    } catch (error) {
        next(err);        
    }
}

export const getAccount = async (req, res, next) => {
    const {account_id} = req.params
    try {
        const account = await Account.find().find({ account_id: account_id })
        res.status(200).json(account)
    } catch (error) {
        next(err);        
    }
}

export const createAccount = async (req, res, next) => {
    try {
        // validating schema
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     // get the first error and just show that
        //     return next(createError(400, errors.array()[0].msg))
        // }        

        const user_id = req.user            
        //currently logged in admin
        const {account_type} = req.body    
        
        // const existingAdmin = await Admin.findOne({ username: username })

        // // if admin with the same username already exist we return error
        // if (existingAdmin){
        //     return next(createError(403, `Admin with username ${username} already exist !`));
        // }

        // const { password:reqPassword } = req.body
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(reqPassword, salt);
        const newAccount = new Account({ user_id: user_id, account_type: account_type, account_balance: 0 });
        await newAccount.save();
        // we can only destructure ._doc otherwise we need to find and deselet
        // const { password, ...others } = newAdmin._doc;

        res.status(200).end();
    } catch (err) {
        next(err);
    }
};