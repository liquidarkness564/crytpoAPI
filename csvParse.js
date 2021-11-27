const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const moment = require('moment');

// .format('MM-DD-YYYY')

module.exports = async (data, curCoin) => {
  const info = [];
  for (let coin of data) {
    let gecko = await CoinGeckoClient.coins.fetchHistory(curCoin, {date: moment(coin.dateField).format('DD-MM-YYYY')})
    let obj = {date: moment(coin.dateField).format('MMMM Do, YYYY'), priceAtDate: Math.round(gecko.data.market_data.current_price.usd * 100) / 100, amountOfCoin: coin.amountField};
    info.push(obj);
  }
  return info;
}