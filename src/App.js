import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Coin from './components/coin-item/coin'

function App() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then((response) => {
                setCoins(response.data);
                console.log(response.data);
            })
            .catch(e => console.error(e));
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div >
            <div className="header">
                <h1 className="brand"><i class="fas fa-yen-sign"></i>  CryptoTracker</h1>
                <form >
                    <input type="text" className="inputfield" onChange={handleChange} placeholder="Search for a coin" />
                </form>
            </div>
            <div className="coinContainer">
                {
                    filteredCoins.map((coin) => {
                        return (
                            <Coin
                                key={coin.id}
                                name={coin.name}
                                price={coin.current_price}
                                symbol={coin.symbol}
                                marketcap={coin.market_cap}
                                volume={coin.total_volume}
                                image={coin.image}
                                priceChange={coin.price_change_percentage_24h}
                            />

                        )
                    })
                }

            </div>
        </div>
    );
}

export default App;

