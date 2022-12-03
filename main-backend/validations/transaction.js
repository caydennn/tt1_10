import {checkSchema} from 'express-validator'

export const createTransactionSchemaValidation = checkSchema({
    account_id: {
        in: ['body'],
        isString: true,
        exists: {
            errorMessage: 'account_id is required'
        }
    },
    receiving_account_id: {
        in: ['body'],
        isString: true,
        exists: {
            errorMessage: 'receiving_account_id is required'
        }
    },
    date: {
        in: ['body'],
        isDate: true,
        exists: {
            errorMessage: 'date is required'
        }
    },
    amount: {
        in: ['body'],
        isNumeric: {
            min: 0,
            errorMessage: 'amount must be a positive number'
        },
        exists: {
            errorMessage: 'amount is required'
        },
        isNumeric: true,
    }
})

export const updateTransactionSchemaValidation = checkSchema({
    account_id: {
        in: ['body'],
        isString: true,
        exists: {
            errorMessage: 'account_id is required'
        }
    },
    comment: {
        in: ['body'],
        isString: true,
        exists: {
            errorMessage: 'comment is required'
        }
    }
})