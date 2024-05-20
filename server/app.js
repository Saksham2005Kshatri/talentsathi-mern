import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for sending form data

app.use("/api/auth", userRoutes);

const __dirname = path.resolve(); // Ensure __dirname is set correctly

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("<h1>Hello world</h1>"));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port=${port}`));
