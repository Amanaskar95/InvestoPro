const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio'); // MY Mongoose model
const getLivePrice = require('../utils/getLivePrice'); // I’ll create this

router.get('/summary/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const holdings = await Portfolio.find({ userId });
    let totalInvested = 0;
    let totalCurrent = 0;

    for (const stock of holdings) {
      const { stockSymbol, quantity, avgBuyPrice } = stock;
      const currentPrice = await getLivePrice(stockSymbol); // Simulate for now

      totalInvested += avgBuyPrice * quantity;
      totalCurrent += currentPrice * quantity;
    }

    const gainLoss = totalCurrent - totalInvested;
    const percentReturn = ((gainLoss / totalInvested) * 100).toFixed(2);

    res.json({
      totalInvested: totalInvested.toFixed(2),
      totalCurrent: totalCurrent.toFixed(2),
      gainLoss: gainLoss.toFixed(2),
      percentReturn,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio summary', error: err });
  }
});

module.exports = router;
