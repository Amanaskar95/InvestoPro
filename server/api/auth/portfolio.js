 

const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio'); // Assuming you have a Mongoose model
const getLivePrice = require('../utils/getLivePrice'); // You’ll make this file

// Route: GET /api/portfolio/summary/:userId
router.get('/summary/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const holdings = await Portfolio.find({ userId });

    let totalInvested = 0;
    let totalCurrent = 0;

    for (const stock of holdings) {
      const { stockSymbol, quantity, avgBuyPrice } = stock;

      // Get current stock price (dummy for now)
      const currentPrice = await getLivePrice(stockSymbol);

      // Add to totals
      totalInvested += avgBuyPrice * quantity;
      totalCurrent += currentPrice * quantity;
    }

    const gainLoss = totalCurrent - totalInvested;
    const percentReturn = totalInvested > 0
      ? ((gainLoss / totalInvested) * 100).toFixed(2)
      : 0;

    res.json({
      totalInvested: totalInvested.toFixed(2),
      totalCurrent: totalCurrent.toFixed(2),
      gainLoss: gainLoss.toFixed(2),
      percentReturn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error calculating portfolio summary', error: err.message });
  }
});

module.exports = router;
