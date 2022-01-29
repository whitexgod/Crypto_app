import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Coin } from './components/Coin';
import DescPopup from './components/DescPopup';
//follow the readme to get the parent site for the API

function App() {

  const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=16&page=1&sparkline=false"

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [coinId, setCoinId] = useState("");

  function getData() {
    axios.get(api)
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getData();
    setInterval(getData, 5000);

    // keep quite eslint......
    // eslint-disable-next-line
  }, [])

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='App'>
      {coinId.length ? <DescPopup coin_id={coinId} changeCoinId={setCoinId} /> : ""}
      <div className={`wrapper ${coinId.length ? "fixed-noscroll" : ""}`}>
        <header>
          <h1>Crypto World</h1>
          <form>
            <input placeholder='Search Crypto Here...' type="text" name='cryto-search' onChange={
              (e) => { setSearch(e.target.value) }
            } />
          </form>
        </header>
        <div className='coin-body'>
          {filteredCoins.map(coin => {
            return (
              <Coin key={coin.id}
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
                changeCoinId={setCoinId} />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

