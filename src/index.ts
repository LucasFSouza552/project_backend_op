import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", indexRoutes)

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor em http://localhost:3000");
});