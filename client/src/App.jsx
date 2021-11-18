import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [hideAddCoin, setHideAddCoin] = useState(false);

  const [allCoins, setAllCoins] = useState([]);

  const [coinName, setCoinName] = useState('');
  const [dateFieldName, setDateFieldName] = useState('');
  const [coinAmountFieldName, setCoinAmountFieldName] = useState('');
  const [isUnixField, setIsUnixField] = useState(false)

  useEffect(() => {
    axios.get('/crypto')
      .then(res => setAllCoins(res.data))
      .catch(err => console.log('failed to get coin data', err))
  }, [])

  const handleInputChange = (e) => {
    switch(e.target.id) {
      case 'nameField':
        setCoinName(e.target.value);
        break;
      case 'dateField':
        setDateFieldName(e.target.value);
        break;
      case 'amountField':
        setCoinAmountFieldName(e.target.value);
        break;
      case 'isUnix':
        if (e.target.value === 'no') {
          setIsUnixField(false);
        } else {
          setIsUnixField(true);
        }
        break;
    }
  }

  const handleSubmitCoin = (coin, dateField, isUnix, amountField) => {
    axios.post('/crypto', {coin, dateField, isUnix, amountField})
      .then(() => setHideAddCoin(false))
      .catch(err => console.log('failed to post new coin', err))
  }

  return (
    <div>
      <h1>Crypto Csv Info</h1>
      <div>
        <div style={{fontSize: '1.5rem', margin: '0 0 0.5rem 0.5rem'}}>
          <label htmlFor='cryptoCoins' style={{marginRight: '3rem'}}>Select Crypto Coin</label>
          <select style={{fontSize: '1.5rem'}} name='cryptoCoins' id='cryptoCoins'>
            {
              allCoins.map(coin => <option value={coin.coin}>{coin.coin}</option>)
            }
          </select>
        </div>
        <div style={{fontSize: '1.5rem', margin: '0 0 0.5rem 0.5rem'}}>
          <label htmlFor='csvFile' style={{marginRight: '1.7rem'}}>Select CSV file</label>
          <input style={{fontSize: '1.5rem'}} type='file' id='csvFile' name='csvFile'></input>
        </div>
        <button style={{fontSize: '1.5rem', margin: '1.5rem 0 3rem 0.5rem'}}>Get Coin Info</button>
        <button onClick={() => setHideAddCoin(true)} style={{display: 'block', fontSize: '1.5rem', margin: '1.5rem 0 1.5rem 0.5rem'}}>Add New Coin</button>
        <div style={{display: hideAddCoin ? 'flex' : 'none', flexFlow: 'column nowrap', width: '25rem'}}>
          <label style={{fontSize: '1.5rem', margin: '0.5rem 0 0.5rem 0.5rem'}} htmlFor='nameField'>Name of Coin</label>
          <input style={{fontSize: '1.5rem'}} onChange={handleInputChange} type='text' id='nameField'></input>
          <label style={{fontSize: '1.5rem', margin: '1.5rem 0 0.5rem 0.5rem'}} htmlFor='dateField'>Name of Date Field</label>
          <input style={{fontSize: '1.5rem'}} onChange={handleInputChange} type='text' id='dateField'></input>
          <label htmlFor='isUnix' style={{fontSize: '1.5rem', margin: '0.5rem 0 0.5rem 0'}}>Is This a Unix Date Field</label>
          <select onChange={handleInputChange} style={{width: '40%', fontSize: '1.4rem', margin: '0 0 2rem 0'}} name='isUnix' id='isUnix'>
            <option value='no'>No</option>
            <option value='yes'>Yes</option>
          </select>
          <label style={{fontSize: '1.5rem', margin: '0.5rem 0 0.5rem 0.5rem'}} htmlFor='amountField'>Name of Coin Amount Field</label>
          <input style={{fontSize: '1.5rem'}} onChange={handleInputChange} type='text' id='amountField'></input>
          <button onClick={() => handleSubmitCoin(coinName, dateFieldName, isUnixField, coinAmountFieldName)} style={{width: '60%', fontSize: '1.5rem', margin: '3rem 0 0.5rem 0.5rem'}}>Submit New Coin</button>
        </div>
      </div>
    </div>
  )
}

export default App;