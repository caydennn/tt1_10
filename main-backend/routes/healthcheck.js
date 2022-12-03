import { Router } from "express";
import { getHealthCheck } from "../controllers/healthcheck.js"

const router = Router()

router.get("/", getHealthCheck)

export default router;