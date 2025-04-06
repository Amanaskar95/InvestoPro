
const dummyPrices = {
    AAPL: 165.3,
    TSLA: 720.5,
    MSFT: 310.2,
};

const getLivePrice = async (symbol) => {
    return dummyPrices[symbol] || 100; // default if unknown
};

module.exports = getLivePrice;


