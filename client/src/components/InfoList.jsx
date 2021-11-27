import React from 'react';
import Info from './Info.jsx';

const InfoList = ({allInfo, coin, isLoading}) => {
  return (
    <div style={{fontSize: '1.5rem'}}>
      <h1 style={{fontSize: '2.5rem'}}>{coin ? coin.toUpperCase() : ""}</h1>
      <div>
        {
          isLoading ?
          allInfo.map(info => <Info info={info} />) :
          <h2>Loading...</h2>
        }
      </div>
    </div>
  )
};

export default InfoList;