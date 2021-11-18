const express = require('express');
const app = express();
const port = 3000;
const Coin = require('./database.js');

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());

app.get('/crypto', async (req, res) => {
  let data = await Coin.find({});
  res.statusCode = 200;
  res.send(data);
})

app.post('/crypto', async (req, res) => {
  let newCoin = new Coin({coin: req.body.coin, dateField: req.body.dateField, isUnix: req.body.isUnix, amountField: req.body.amountField});
  await newCoin.save();
  res.statusCode = 201;
  res.end('201 Ok');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});