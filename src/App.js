import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Coin } from "./components/Coin";
import DescPopup from "./components/DescPopup";
import SignIn from "./components/SignIn";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignOut } from "./components/SignOut";
//follow the readme to get the parent site for the API

function App() {
  const api =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false";

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [coinId, setCoinId] = useState("");
  const [signIn, setSignIn] = useState(false);
  const [user] = useAuthState(auth);
  // const [wishlist, setwishlist] = useState(["bitcoin", "ethereum", "tether", "cardano","dogecoin"]);
  const wishlist = ["bitcoin", "ethereum", "tether", "cardano","dogecoin"];

  // function modifyWishList (elem) {
  //   if (wishlist.includes(elem)) {
  //     let mod = wishlist.filter((e)=>{
  //       return e !== elem;
  //     })
  //     setwishlist(mod);
  //   } else {
  //     let tmp = wishlist;
  //     tmp.push(elem);
  //     setwishlist(tmp);
  //   }
  //   console.log(elem);
  //   setTimeout(()=>{console.log(wishlist)}, 3000);
  // }

  function getData() {
    axios
      .get(api)
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
    setInterval(getData, 5000);

    // keep quite eslint......
    // eslint-disable-next-line
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      {coinId.length ? (
        <DescPopup
          coin_id={coinId}
          changeCoinId={setCoinId}
        />
      ) : (
        ""
      )}
      {signIn ? <SignIn dontWantToSignIn={setSignIn} /> : ""}
      <div className={`wrapper ${coinId.length ? "fixed-noscroll" : ""}`}>
        <header>
          <h1>Crypto Tracker</h1>
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
          <div className="signIn-signOut">
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
          </div>
        </header>
      <div className={`coin-body ${signIn ? "fixed-noscroll":""}`}>
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
                iswish={(user && wishlist.includes(coin.id))}
                // changeWishlist={modifyWishList}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
