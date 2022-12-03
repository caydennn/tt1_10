import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
    {   
        user_id: {
            type: String,
            required: true,            
        },
        account_type: {
            type: String,
            required: true,            
        },
        account_balance:{
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Account", AccountSchema);