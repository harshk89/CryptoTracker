import { React, useState, useEffect } from 'react'
import { flushSync } from 'react-dom';
import CoinCard from "../CoinCard/CoinCard"
import "./Home.css"
import toTopBtn from "./toTopBtn.png"

function Home() {
    const [coins, setCoins] = useState([]);
    const [currencyUUID, setCurrencyUUID] = useState("yhjMzLPhuIDl");
    const [timePeriod, setTimePeriod] = useState("24h");
    const [orderBy, setOrderBy] = useState("marketCap")
    const [orderDirection, setOrderDirection] = useState("desc")
    const [limit, setLimit] = useState("100")
    // const [offset, setOffset] = useState("0")
    const [searchValue, setSearchValue] = useState("")

    const updatePage = async()=>{
        var dataArray = [];
        var totalResults=0;
        var i=1;
        var offSet = 0;
        do {
            const url = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=${currencyUUID}&timePeriod=${timePeriod}&tiers%5B0%5D=1&orderBy=${orderBy}&orderDirection=${orderDirection}&limit=${limit}&offset=${offSet}`;
            const data = await fetch(url, {
                method: 'GET',
                headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                }
            });
            // setOffset(offset+100);
            offSet = offSet+100;
            const parsedData = await data.json();
            dataArray = [...dataArray, ...parsedData.data.coins];
            // dataArray = dataArray.cancat(parsedData.data.coins);
            totalResults = parsedData.data.stats.total;
            console.log("dataArray length = "+dataArray.length);
            console.log("total coins = "+totalResults);
            console.log("offset = "+offSet);
            console.log("i = "+i);
            setCoins(dataArray);
            if(i<20)
                i = i+1;
            else
                break;
        } while(offSet < totalResults);

        console.log(offSet);
    }
    
    useEffect(() => {
        updatePage();
    }, [orderBy, orderDirection, currencyUUID])

    // const handleSearch = ()=>{
    //     console.log("handle search activated")
    //     const searchUrl = 
    // }

    // Scroll to top btn
    let scrollToTopButton = document.getElementById("btn-back-to-top");
    window.onscroll = function () {
        scrollFunction();
    };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    }
    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

  return (
    <div className='home'>
        <div className="container coins-section">
            <div className="header">
                Track Coins
            </div>
            <div className="container controller">
                <div className="sort-by">
                    <div className="dropdown">
                        <button className="sort-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort
                        </button>
                        <ul className="dropdown-menu">
                            <li><button onClick={()=>{setOrderBy("marketCap")}} className={`dropdown-item ${(orderBy==="marketCap")?"active":""}`} >Market Cap</button></li>
                            <li><button onClick={()=>{setOrderBy("price")}} className={`dropdown-item ${(orderBy==="price")?"active":""}`}>Price</button></li>
                            <li><button onClick={()=>{setOrderBy("24hVolume")}} className={`dropdown-item ${(orderBy==="24hVolume")?"active":""}`}>24 hr Volume</button></li>
                            <li><button onClick={()=>{setOrderBy("change")}} className={`dropdown-item ${(orderBy==="change")?"active":""}`}>24 hr Change</button></li>
                        </ul>
                    </div>
                </div>
                <div className="order-by">
                    <div className="dropdown">
                        <button className="order-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Order
                        </button>
                        <ul className="dropdown-menu">
                            <li><button onClick={()=>{setOrderDirection("desc")}} className={`dropdown-item ${(orderDirection==="desc")?"active":""}`}>Descending</button></li>
                            <li><button onClick={()=>{setOrderDirection("asc")}} className={`dropdown-item ${(orderDirection==="asc")?"active":""}`}>Ascending</button></li>
                        </ul>
                    </div>
                </div>
                {/* <div className="set-currency">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            View in
                        </button>
                        <ul className="dropdown-menu">
                            <li><button onClick={()=>{setCurrencyUUID("6mUvpzCc2lFo")}} className={`dropdown-item ${(currencyUUID==="6mUvpzCc2lFo")?"active":""}`}>₹ Indian Rupees</button></li>
                            <li><button onClick={()=>{setCurrencyUUID("yhjMzLPhuIDl")}} className={`dropdown-item ${(currencyUUID==="yhjMzLPhuIDl")?"active":""}`}>$ US Dollar</button></li>
                            <li><button onClick={()=>{setCurrencyUUID("5k-_VTxqtCEI")}} className={`dropdown-item ${(currencyUUID==="5k-_VTxqtCEI")?"active":""}`}>€ Euro</button></li>
                            <li><button onClick={()=>{setCurrencyUUID("OEomm4hQzk_M")}} className={`dropdown-item ${(currencyUUID==="OEomm4hQzk_M")?"active":""}`}>$ Australian Dollar</button></li>
                            <li><button onClick={()=>{setCurrencyUUID("Hokyui45Z38f")}} className={`dropdown-item ${(currencyUUID==="Hokyui45Z38f")?"active":""}`}>£ British Pound Sterling</button></li>
                        </ul>
                    </div>
                </div> */}
                <div className="search-coin">
                    <form className="d-flex" role="search">
                        <input onChange={(e)=>{setSearchValue(e.target.value)}} className="coin-search-bar" type="search" placeholder="Search" aria-label="Search"/>
                        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                    </form>
                </div>

            </div>
            <div className="container">
                {coins.filter((val)=>{
                    if(searchValue === "") {
                        return val
                    } else if(val.name.toLowerCase().includes(searchValue.toLowerCase()) || val.symbol.toLowerCase().includes(searchValue.toLowerCase())) {
                        return val
                    }
                }).map((coin, key)=>{
                    return(
                        <div>
                            <CoinCard rank={coin.rank} uuid={coin.uuid} symbol={coin.symbol} name={coin.name} iconUrl={coin.iconUrl} marketCap={coin.marketCap} price={coin.price} change={coin.change} sparkline={coin.sparkline} Volume={coin['24hVolume']} url={coin.coinrankingUrl} key={key}/>
                        </div>
                    )
                })}
            </div>
            
        </div>
        <div className="container news-section glass-effect">
            <h1>News</h1>
        </div>

        {/* Scroll to top button */}
        <a onClick={backToTop} id="btn-back-to-top">
            <img src={toTopBtn} alt="" />
        </a>
    </div>
  )
}

export default Home