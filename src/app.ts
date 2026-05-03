import cors from "cors";
import express from "express";

import connectDB from "./database/mongo.js";
import { errorHandler } from "./middleware/errorHandler.js";

import indexRoutes from "./routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use("/api", indexRoutes)

app.use(errorHandler);

let isConnected = false;
async function initDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}
initDB();

export default app;
