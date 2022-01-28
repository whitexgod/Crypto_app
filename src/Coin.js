import React from 'react';
import "./Coin.css"

export const Coin = (props) => {
  return <div>
      <div className='coin-container'>
          <div className='coin-row'>
            <div className='coin'>
                <img src={props.coin_image} alt="crypto-image" />
                <h1>Name : {props.coin_name}</h1>
                <p>{props.coin_symbol}</p>
                <p>Rank : {props.coin_rank}</p>
            </div>
            <div className='coin-data'>
                <p>Current-Price : Rs. {props.coin_price}</p>
                <p>Volume : Rs. {props.coin_volume.toLocaleString()}</p>
                <p>Market-Cap : Rs. {props.coin_marketCap.toLocaleString()}</p>
                {props.priceChange < 0 ? (
                    <p className='coin-present-red'>% Price-change-1D : {props.priceChange.toFixed(2)}%</p>
                ) : (
                    <p className='coin-present-green'>% Price-change-1D : {props.priceChange.toFixed(2)}%</p>
                )
                }
                {props.priceChangeMarketCap < 0 ? (
                    <p className='coin-present-red'>% Market Cap-change-1D : {props.priceChangeMarketCap.toFixed(2)}%</p>
                ) : (
                    <p className='coin-present-green'>% Market Cap-change-1D : {props.priceChangeMarketCap.toFixed(2)}%</p>
                )
                }
            </div>
          </div>
      </div>
  </div>;
};
