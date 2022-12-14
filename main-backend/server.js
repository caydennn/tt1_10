import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import { connect } from "./utils/db.js";
import healthCheckRoutes from "./routes/healthcheck.js";
import accountRoutes from "./routes/account.js";
import transactionRoutes from "./routes/transaction.js";
import invalidRouteHandler from "./middleware/invalidRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import { logError, logSuccess, logWarn } from "./utils/logger.js";
import { userLoggedIn } from "./middleware/userLoggedIn.js";

// application
const app = express();

// configs store in .env files
dotenv.config();

// middleware packages
// since this is purely a rest api server set it to be the following
app.all("*", (req, res, next) => {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Set response content-type header
  res.contentType("application/json");
  next();
});

// security middleware
app.use(helmet());
// cors middleware
// set cors to localhost:3000

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// parse cookie
app.use(cookieParser());
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

app.use("/api/healthcheck", userLoggedIn, healthCheckRoutes);
app.use("/api/auth", authRoutes);

// custom crud routers
app.use("/api/accounts", userLoggedIn, accountRoutes);

app.use("/api/transactions", userLoggedIn, transactionRoutes);

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
