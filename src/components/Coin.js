import React, { useState } from 'react';
import "./Coin.css";
import heart_red from "../assets/heart-red.png";
import heart_empty from "../assets/heart-empty.png";

const Coin = (props) => {

    const [wishlisted, setWishlisted] = useState(props.iswish);

    const passCoinId = () => {
        props.changeCoinId(props.coin_id);
    }

    const handleWishlishClick = () => {
        setWishlisted(!wishlisted);
        // props.changeWishlist(props.coin_id);
    }

    return (
        <>
            <div className='coin-box'>
                <div className='wishlist-heart'>
                    {/* <img src={wishlisted? heart_red : heart_empty} onClick={handleWishlishClick}/> */}
                    <img src={wishlisted ? heart_red : heart_empty} onClick={handleWishlishClick} alt='wishlist'/>
                </div>
                <div className='coin'>
                    <img src={props.coin_image} onClick={passCoinId} alt="crypto" />
                    <h1>{props.coin_name} ({props.coin_symbol})</h1>
                    <strong>Rank: {props.coin_rank}</strong>
                </div>
                <div className='coin-data'>
                    {/* {wishlisted ? "True":"False"}
                    {props.iswish ? "True":"False"} */}
                    <p><strong>Current price:</strong> Rs. {props.coin_price}</p>
                    <p><strong>Volume:</strong> Rs. {props.coin_volume.toLocaleString()}</p>
                    <p><strong>Market-Cap:</strong> Rs. {props.coin_marketCap.toLocaleString()}</p>
                    <p className={props.priceChange < 0 ? "coin-present-red" : "coin-present-green"}><strong>% Price-change-1D: </strong>{props.priceChange.toFixed(2)}%</p>
                    <p className={props.priceChangeMarketCap < 0 ? "coin-present-red" : "coin-present-green"}><strong>% Market Cap-change-1D: </strong>{props.priceChangeMarketCap.toFixed(2)}%</p>
                </div>
            </div>
        </>
    );
};
export { Coin };
