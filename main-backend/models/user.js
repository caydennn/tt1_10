import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 8,
            maxLength: 20,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            minlength: 1,
            maxLength: 200,
            required: true,            
        },
        lastName: {
            type: String,
            minlength: 1,
            maxLength: 200,
            required: true,            
        },
        address: {
            type: String,
            minLength: 20,
            maxLength: 200,            
            required: true,
        },
        email: {
            type: String,
            minLength: 3,
            maxLength: 200,
            required: true,
        },
        optIntoPhyStatements: {
            type: Number,
            default: 0,
            required: true,

        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);