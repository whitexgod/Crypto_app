import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Coin } from "./components/Coin";
import DescPopup from "./components/DescPopup";
import SignIn from "./components/SignIn";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignOut } from "./components/SignOut";
import { WishList } from "./components/WishList";
import { db } from "./firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { TopGainers } from "./components/TopGainers";
import { TopLoosers } from "./components/TopLoosers";
//follow the readme to get the parent site for the API

function App() {
  const api =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [coinId, setCoinId] = useState("");
  const [signIn, setSignIn] = useState(false);
  const [topGainers, setTopGainers] = useState(false)
  const [topLoosers, setTopLoosers] = useState(false)
  const [user] = useAuthState(auth);
  const [wishList, setWishList] = useState(false);
  const [wishListItems, setWishListItems] = useState([]);


  function getData() {
    axios
      .get(api)
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getData();
    setInterval(getData, 5000);
    // keep quite eslint......
    // eslint-disable-next-line
  }, []);

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
    }
  }, [user]);

  /****************** */

  return (
    <div className="App">
      {coinId.length ? (
        <DescPopup coin_id={coinId} changeCoinId={setCoinId} />
      ) : (
        ""
      )}
      {signIn ? <SignIn dontWantToSignIn={setSignIn} /> : ""}
      {wishList ? (
        <WishList coins={coins} closeWishList={setWishList} />
      ) : (
        ""
      )}
      {topGainers ? (<TopGainers coins={coins} closeTopGainers={setTopGainers} />) : ("")}
      {topLoosers ? (<TopLoosers coins={coins} closeTopLoosers={setTopLoosers} />) : ("")}
      <div className={`wrapper ${coinId.length || wishList || topGainers || topLoosers ? "fixed-noscroll" : ""}`}>
        <header>
          <h1>CrYp-City</h1>
          <form>
            <input
              placeholder="Search Crypto Here..."
              type="text"
              name="cryto-search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
          <nav className="navbar">
            <ul>
              <li onClick={() => {
                user ? setWishList(true) : setSignIn(true);
              }}>WatchList</li>
              <li onClick={() => {
                setTopGainers(true);
              }}>Gainers</li>
              <li onClick={() => {
                setTopLoosers(true);
              }}>Loosers</li>
              <li>
                {user ? (
                  <SignOut />
                ) : (
                  <button
                    className="btn_glob"
                    onClick={() => {
                      setSignIn(true);
                    }}
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </header>
        <div className={`coin-body ${signIn ? "fixed-noscroll" : ""}`}>
          {filteredCoins.map((coin) => {
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
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
