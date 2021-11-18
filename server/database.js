const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crypto', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => {
  console.error('connection error')
});
db.once('open', () => {
  console.log('Connected to Mongo!')
});

const coinSchema = mongoose.Schema({
  coin: String,
  dateField: String,
  isUnix: Boolean,
  amountField: String
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;