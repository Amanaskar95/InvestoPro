const express = require("express");
const axios = require("axios");
const router = express.Router();

// You can use a free or paid stock API (like Twelve Data, Finnhub, etc.)
const API_KEY = process.env.STOCK_API_KEY;

// Example: Get Top Gainers (from Finnhub or any API)
router.get("/top-gainers", async (req, res) => {
  try {
    const response = await axios.get(`https://api.example.com/market/top-gainers?apikey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top gainers:", error.message);
    res.status(500).json({ error: "Failed to fetch top gainers" });
  }
});

// Example: Get Top Losers
router.get("/top-losers", async (req, res) => {
  try {
    const response = await axios.get(`https://api.example.com/market/top-losers?apikey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top losers:", error.message);
    res.status(500).json({ error: "Failed to fetch top losers" });
  }
});

module.exports = router;
