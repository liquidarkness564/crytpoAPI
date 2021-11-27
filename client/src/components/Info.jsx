import React from 'react';

const Info = ({info}) => {
  return (
    <div style={{lineHeight: '0.5rem', backgroundColor: 'rgb(227, 227, 227)', margin: '0.5rem 0 0.5rem 0', padding: '0.22rem'}}>
      <p>Date: {info.date}</p>
      <p>Price At Date: ${info.priceAtDate}</p>
      <p>Amount of Coin: {info.amountOfCoin}</p>
      <p>Total Price: ${Math.round(info.priceAtDate * info.amountOfCoin * 100)/100}</p>
    </div>
  )
}

export default Info;