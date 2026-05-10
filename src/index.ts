import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware/errorHandler.js";

import indexRoutes from "./routes/router.js";

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin == process.env.FRONTEND_URL) {
    next();
  }

  if (process.env.FRONTEND_URL && origin !== process.env.FRONTEND_URL) {
    return res.redirect(process.env.FRONTEND_URL);
  }
  
  return res.status(403).json({
    error: "Acesso negado"
  });

});

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