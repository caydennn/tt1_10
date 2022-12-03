export const getHealthCheck = async (req, res) => {
    
    console.log(req.auth)
    try {
        const healthCheck = {
            message: "Ok",
            uptime: process.uptime(),
            responseTime: process.hrtime(),
            timestamp: Date.now(),
        };
        res.status(200).json(healthCheck)
    } catch (error) {        
        next(error)
    }
}