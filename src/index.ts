import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware/errorHandler.js";

import indexRoutes from "./routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api", indexRoutes)

app.use(errorHandler);

export default app;
