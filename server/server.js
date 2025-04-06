require("dotenv").config();
const express = require("express");
const mongoose = require("./config/database");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const portfolioRoutes = require("./routes/portfolio"); // ✅ Only this one

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes); // 👈 Now works fine

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
