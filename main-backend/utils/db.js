import mongoose from 'mongoose'
import { logSuccess } from './logger.js'

export const connect = (url = process.env.MONGO_URI, opts = {}) => {
    logSuccess("Connected to Database !")
    return mongoose.connect(
        url,
        { ...opts, useNewUrlParser: true }
    )
}