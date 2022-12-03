export const createError = (status, message, success = false) => {
    const err = new Error()
    err.status = status
    err.message = message
    err.success = success
    return err
} 