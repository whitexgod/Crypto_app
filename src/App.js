import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Coin } from './Coin';
//follow the readme to get the parent site for the API

function App() {

  const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    axios.get(api)
    .then(res => {
      setCoins(res.data);
      //console.log(res.data);
    })
    .catch(error => console.log(error))
  },[])

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="App">
      <h1>Crypto World</h1>
      <div>
        <form>
          <input placeholder='search for a crypto here...' type="text" name='cryto-search' onChange={
            (e) => {setSearch(e.target.value)}
            } />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin key={coin.id}
          coin_rank={coin.market_cap_rank}
          coin_name={coin.name}
          coin_image={coin.image}
          coin_symbol={coin.symbol}
          coin_price={coin.current_price}
          coin_marketCap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h} 
          priceChangeMarketCap={coin.market_cap_change_percentage_24h}
          coin_volume={coin.total_volume} />
        )
      })}
    </div>
  );
}

export default App;

