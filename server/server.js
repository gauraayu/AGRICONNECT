const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const problemRoutes = require("./routes/problems");
const userRoutes    = require("./routes/users");

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to:", process.env.MONGO_URI))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// Routes
app.use("/problems", problemRoutes);
app.use("/users",    userRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "AgriConnect API running 🌾" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});