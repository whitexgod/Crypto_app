import React, { useState, useEffect } from "react";
import close_img from "../assets/close.png";
import loading_svg from "../assets/loading.svg";
import "./TopLoosers.css";
import { Coin } from "./Coin";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const TopLoosers = (props) => {
  const [TopLoosersLoading, setTopLoosersLoading] = useState(true);
  const [wishListItems, setWishListItems] = useState([]);
  const [coinId, setCoinId] = useState("");
  const [user] = useAuthState(auth);

  //***************** */
  //for responsive wish items

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "wishlist"),
        where("Email", "==", auth.currentUser.email)
      );
      onSnapshot(q, (snapshot) => {
        setWishListItems(snapshot.docs.map((doc) => doc.data().Coin_id));
      });
      setTopLoosersLoading(false);
    }
  }, [user]);

  /****************** */

  function handleCloseTopLoosers() {
    props.closeTopLoosers(false);
  }

  return (
    <div className="popup">
      {TopLoosersLoading && (
        <div className="loadder">
          <img src={loading_svg} alt="" />
        </div>
      )}
      {!TopLoosersLoading && (
        <>
          <button className="close-btn" onClick={handleCloseTopLoosers}>
            <img src={close_img} alt="close" />
          </button>
          <div className="Loosers-heading">
            <h1>Loosers List</h1>
          </div>
          <div className={`coin-body `}>
            {props.coins.map((coin) => {
              if (coin.price_change_percentage_24h < 0) {
                return (
                  <Coin
                    key={coin.id}
                    coin_id={coin.id}
                    coin_rank={coin.market_cap_rank}
                    coin_name={coin.name}
                    coin_image={coin.image}
                    coin_symbol={coin.symbol}
                    coin_price={coin.current_price}
                    coin_marketCap={coin.market_cap}
                    priceChange={coin.price_change_percentage_24h}
                    priceChangeMarketCap={coin.market_cap_change_percentage_24h}
                    coin_volume={coin.total_volume}
                    changeCoinId={setCoinId}
                    list={wishListItems}
                  />
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};
