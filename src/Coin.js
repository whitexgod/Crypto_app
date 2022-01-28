import React, { useState, useEffect } from 'react';
import "./Coin.css"
import axios from 'axios';

const Coin = (props) => {
    const [ID, setID] = useState('');
    const [desc, setDesc] = useState('')

    function getCoinID() {
        setID(props.coin_id) 
        //console.log(ID)
        axios.get(`https://api.coingecko.com/api/v3/coins/${ID}?localization=false`)
        .then(res => {
            setDesc(res.data.description.en.replace( /(<([^>]+)>)/ig, ''));
            console.log(desc.replace( /(<([^>]+)>)/ig, ''))
          })
          .catch(error => console.log(error))
    }
    
    return (
        <div className='coin-box' onClick={getCoinID}>
            <div className='coin' >
                <img src={props.coin_image} alt="crypto" />
                <h1>{props.coin_name} ({props.coin_symbol})</h1>
                <strong>Rank: {props.coin_rank}</strong>
            </div>
            <div className='coin-data'>
                
                <p><strong>Current price:</strong> Rs. {props.coin_price}</p>
                <p><strong>Volume:</strong> Rs. {props.coin_volume.toLocaleString()}</p>
                <p><strong>Market-Cap:</strong> Rs. {props.coin_marketCap.toLocaleString()}</p>

                <div className='popup'>
                    <div className='content'>
                        {desc}
                    </div>
                </div>
                
                <p className={props.priceChange < 0 ? "coin-present-red" : "coin-present-green"}><strong>% Price-change-1D: </strong>{props.priceChange.toFixed(2)}%</p>
                <p className={props.priceChangeMarketCap < 0 ? "coin-present-red" : "coin-present-green"}><strong>% Market Cap-change-1D: </strong>{props.priceChangeMarketCap.toFixed(2)}%</p>
            </div>
        </div>);
};
export { Coin }  ;
