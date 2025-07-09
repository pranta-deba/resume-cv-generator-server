import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//!  MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/resume-generator",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//! Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Resume Generator API!",
    timestamp: new Date().toISOString(),
  });
});

//! Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
