import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./database/mongo";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use("/api", indexRoutes)


app.use(errorHandler);

connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`);
  });
}

export default app;