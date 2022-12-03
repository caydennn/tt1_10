import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express"
import { connect } from "./utils/db.js";
import healthCheckRoutes from "./routes/healthcheck.js"
import accountRoutes from "./routes/account.js"
import invalidRouteHandler from "./middleware/invalidRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js"
import { logError, logSuccess, logWarn } from "./utils/logger.js";

// application
const app = express();

// configs store in .env files
dotenv.config();

// middleware packages
// since this is purely a rest api server set it to be the following
app.all("*", (req, res, next) => {
  // Set response content-type header
  res.contentType("application/json");
  next();
});

// security middleware
app.use(helmet());
// cors middleware
app.use(cors())
// parse cookie
app.use(cookieParser())
// parse body and put it to req.body
app.use(express.json());
// security middleware for nosql injections
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      logWarn(`This request[${key}] is sanitized`, req[key], req.originalUrl);
    },
  })
);

// logger middleware
app.use(morgan("common"));

// custom crud routers

app.use("/api/healthcheck", verifyToken, healthCheckRoutes);
app.use("/api/auth", authRoutes)

// custom crud routers
app.use("/accounts", verifyToken, accountRoutes)

app.use("/api/transactions", transactionRoutes);

//error handler middleware
app.use(errorHandler);

// invalid routes handler - unmatched routes
app.use(invalidRouteHandler);

// db connection
export const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      logSuccess(`REST API on http://localhost:${process.env.PORT}/api`);
    });
  } catch (e) {
    logError(e);
  }
};
