import Binance from "binance";

const CoinPrices = async (coins) => {
  const binance = new Binance();
  const prices = await binance.getPrices(coins);

  return prices;
};

export default CoinPrices;