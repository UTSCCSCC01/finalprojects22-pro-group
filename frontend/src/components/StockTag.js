import React, { useEffect, useState } from "react";

function StockTag({ stockSymbol, position }) {
    const [color, setColor] = useState(true);
    const [price, setPrice] = useState(0);
    const [volume, setVolume] = useState(0);
    const [w52High, setW52High] = useState(0);
    const [w52Low, setW52Low] = useState(0);

    useEffect(() => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const getData = async () => {
            if (!stockSymbol) return;
            const sandbox = `https://sandbox.iexapis.com/stable/stock/${stockSymbol}/batch?types=quote&last=1&token=Tpk_245594011ed142fca35e0d76758e1d33`;

            const response = await fetch(sandbox)
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 429) {
                        sleep(200).then(() => getData(stockSymbol));
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    // if (position === "a") {
                    const quote = data.quote;
                    console.log(quote);
                    // price, volume, week52High, week52Low
                    // if(quote.price >= price)
                    setPrice(quote.latestPrice);
                    setVolume(quote.latestVolume);
                    setW52High(quote.week52High);
                    setW52Low(quote.week52Low);
                    // } else {
                    // === 1
                    // }
                    // set up information
                });
        };
        getData();
    }, [stockSymbol]);

    return (
        <div>
            <div className="border">
                <div>{stockSymbol}</div>
                <div>Price: {price}</div>
                <div>Volume: {volume}</div>
                <div>Highest in 52 weeks: {w52High}</div>
                <div>Lowest in 52 weeks: {w52Low}</div>
            </div>
        </div>
    );
}

export default StockTag;
