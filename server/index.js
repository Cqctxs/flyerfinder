require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/connectMongo");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Replace with your allowed origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: true }));
app.enable("trust proxy");
app.disable("x-powered-by");
connectDB();

app.use("/flyer", require("./routes/flyer"));

// 404 middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "endpoint not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});