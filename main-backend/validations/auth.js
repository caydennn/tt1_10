import { checkSchema } from "express-validator"

export const registerUserSchemaValidation = checkSchema({
    "username": {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "username is required"
        },
        isLength: {
            errorMessage: "username should be at least 8 chars long",
            options: { min: 8, max: 20 },
        },
    },
    "password": {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "password is required"
        },
        isLength: {
            errorMessage: "password should be at least 8 chars long",
            options: { min: 8, max: 20 },
        },
    },
    "firstName": {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "firstName is required"
        },
        isLength: {
            errorMessage: "firstName should be at least 1 char long",
            options: { min: 1, max: 200 },
        },
    },    
    "lastName": {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "lastName is required"
        },
        isLength: {
            errorMessage: "lastName should be at least 1 chars long",
            options: { min: 1, max: 200 },
        },
    },    
    "address": {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "address is required"
        },
        isLength: {
            errorMessage: "address should be at least 20 chars long",
            options: { min: 20, max: 200 },
        },
    },    
})

export const loginUserSchemaValidation = checkSchema({
    "username": {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "username is required"
        },
        isLength: {
            errorMessage: "username should be at least 8 chars long",
            options: { min: 8, max: 20 },
        },
    },
    "password": {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "password is required"
        },
        isLength: {
            errorMessage: "password should be at least 8 chars long",
            options: { min: 8, max: 20 },
        },
    },
})