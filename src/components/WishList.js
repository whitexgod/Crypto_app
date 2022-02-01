import React, { useEffect, useState } from "react";
import close_img from "../assets/close.png";
import loading_svg from "../assets/loading.svg";
import "./wishList.css";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import emptyDp from "../assets/empty_dp.png";
import { Coin } from "./Coin";

export const WishList = (props) => {
  const [coinId, setCoinId] = useState("");
  const [wishListItems, setWishListItems] = useState([]);
  const [isWishListLoading, setIsWishListLoading] = useState(true);
  useEffect(() => {
    const q = query(
      collection(db, "wishlist"),
      where("Email", "==", auth.currentUser.email)
    );
    // const list=[]
    const useME = onSnapshot(q, (snapshot) => {
      setWishListItems(snapshot.docs.map((doc) => doc.data()));
      // list.push(snapshot.docs.map((doc) => doc.data().Coin_id))
      // console.log(list)
      // console.log(list.includes('bitcoin'))
      //  console.log(snapshot.docs.map((doc) => doc.data()));
      //  console.log(snapshot.docs.map((doc) => doc.data().Coin_id));
      setIsWishListLoading(false);
    });
    return useME;
  }, []);

  function handleCloseWishList() {
    props.closeWishList(false);
  }
  const { photoURL, email } = auth.currentUser;
  return (
    <div className="popup">
      {isWishListLoading && (
        <div className="loadder">
          <img src={loading_svg} alt="" />
        </div>
      )}
      {!isWishListLoading && (
        <>
          <button className="close-btn" onClick={handleCloseWishList}>
            <img src={close_img} alt="close" />
          </button>
          <div className="user-details-box">
            <img src={!photoURL ? emptyDp : photoURL} alt="userphoto" />
            <h4>Email : {email}</h4>
            <hr />
            <h2>Wish-Listed Coins</h2>
            <div className="coin-body">
              {wishListItems.map(({ Coin_id, uid }) => (
                //<p key={`${uid}+${Math.floor(Math.random() * 101)}`}><p/>
                  props.coins.map((coin) => {
                    if (coin.id === Coin_id) {
                      return (
                        <>
                        <div className="coin-box">
                          <div className="coin">
                            <img src={coin.image} alt="crypto" />
                            <h1>
                              {coin.name} ({coin.symbol})
                            </h1>
                            <strong>Rank: {coin.market_cap_rank}</strong>
                          </div>
                          <div className="coin-data">
                            <p>
                              <strong>Current price:</strong> Rs.{" "}
                              {coin.current_price}
                            </p>
                            <p>
                              <strong>Volume:</strong> Rs.{" "}
                              {coin.total_volume.toLocaleString()}
                            </p>
                            <p>
                              <strong>Market-Cap:</strong> Rs.{" "}
                              {coin.market_cap.toLocaleString()}
                            </p>
                            <p
                              className={
                                coin.price_change_percentage_24h < 0
                                  ? "coin-present-red"
                                  : "coin-present-green"
                              }
                            >
                              <strong>% Price-change-1D: </strong>
                              {coin.price_change_percentage_24h.toFixed(2)}%
                            </p>
                            <p
                              className={
                                coin.market_cap_change_percentage_24h < 0
                                  ? "coin-present-red"
                                  : "coin-present-green"
                              }
                            >
                              <strong>% Market Cap-change-1D: </strong>
                              {coin.market_cap_change_percentage_24h.toFixed(2)}%
                            </p>
                          </div>
                          </div>
                        </>
                      );
                    }
                  })  
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
