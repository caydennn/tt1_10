import { checkSchema} from "express-validator"

export const accountCreation = checkSchema({
    "account_type": {
        in: ["body"],
        exists: {
            errorMessage: "account_type is required"
        },        
        isIn: {
            options: [["SAVING", "MULTIPLIER", "CURRENT"]],                  
            errorMessage: "account_type can only be SAVING/MULTIPLIER/CURRENT",
        },
    },
})