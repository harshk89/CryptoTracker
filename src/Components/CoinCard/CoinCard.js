import {React, useState} from 'react'
import "./CoinCard.css"
import upArrow from "./upArrow.png"
import downArrow from "./downArrow.png"

function CoinCard(props) {
    let {rank, uuid, symbol, name, iconUrl, marketCap, price, change, sparkline, Volume, url, key} = props;
    const roundedPrice = Math.round(price*100)/100;
    const roundedMarketCap = Math.round(marketCap*100)/100;
    const rounded24hVol = Math.round(Volume*100)/100;

    var colour = "#0ae821"
    if(change<0) {
        colour = "#c10505";
    }
    
    return (
        <a className={`coin-card glass-effect ${(change<0)?"red":"green"}`} href={url} target="_blank">
            {/* <div className='coin-card'> */}
                <div className="logo">
                    <img src={iconUrl} alt={symbol} />
                    <h5>{symbol}</h5>
                </div>
                <div className="coin-info">
                    <div className='coin-info-primary'>
                        <div className="coin-name">{name}</div>
                        <div className="price-tag">Price: <span className='coin-price' style={{color: colour}}>${roundedPrice}</span></div>
                        <div className="change-tag">Change: <span className='coin-change' style={{color: colour}}>{change}%</span> <span className='price-change-arrow'><img src={`${(change<0)?downArrow:upArrow}`} alt="" /></span></div>
                    </div>
                    <div className="coin-info-secondary">
                        <div className="marketCap-tag">Market Cap: <span className='coin-marketCap'>${roundedMarketCap}</span></div>
                        <div className="Volume-tag">24 hrs Vol: <span className='coin-24hVolume'>${rounded24hVol}</span></div>
                    </div>
                </div>
            {/* </div> */}
        </a>
    )
}

export default CoinCard