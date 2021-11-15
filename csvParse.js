const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const csv = require('jquery-csv');
const fs = require('fs');
const moment = require('moment');
moment().format();

fs.readFile('csvs/export-0xdff723CCe14fF76ff65675B07C0E53081E85f350.csv', 'utf8', (err, data) => {
  if (err) {
    console.log('failed to read file');
  } else {
    csv.toObjects(data, (err1, data1) => {
      if (err1) {
        console.log('failed to convert string to array');
      } else {
        data1.forEach(async coin => {
          let curData = await CoinGeckoClient.coins.fetchHistory('ethereum', {date: moment.unix(coin.UnixTimestamp).format('DD-MM-YYYY')});
          console.log(curData.data.market_data.current_price.usd);
        })
        // console.log(moment.unix(data1[0].UnixTimestamp).format('DD-MM-YYYY'));
      }
    })
  }
});