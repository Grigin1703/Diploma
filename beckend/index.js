import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import toursRoutes from "./services/toursRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev")); // Для запросов
app.use(express.json());
app.use(cors());
app.use("/api/tours", toursRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
