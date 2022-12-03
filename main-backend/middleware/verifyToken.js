import { expressjwt as jwt } from "express-jwt"
import jwks from "jwks-rsa"
import dotenv from "dotenv"

dotenv.config()

export const verifyToken = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTHO_JWKS_URI
    }),
    audience: process.env.AUTHO_AUDIENCE,
    issuer: process.env.AUTHO_ISSUER,
    algorithms: [process.env.AUTHO_JWT_ALGO]
});