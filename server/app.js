import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT || 8000;

// app.use(
//   cors({
//     origin: "https://talentsathi-host.onrender.com", // Your frontend URL
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://talentsathi-host.onrender.com", // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for sending form data

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => res.send("<h1>Hello world</h1>"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port=${port}`));
