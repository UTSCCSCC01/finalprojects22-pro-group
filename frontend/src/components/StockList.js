import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function StockList() {
    const navigate = useNavigate();
    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);
    const [stockHotlist, setStockHotlist] = useState([]);

    // const [StockSymbol, setStockSymbol] = useState("FB");

    const API_KEY = "THN5ITBH3LFSAWLV";

    // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;
    //https://www.yahoofinanceapi.com/
    //mqGwUbeB2K1t2FFNFFXaV8mXEPBry3hX7rGo1R0n

    const getStockHotlist = async () => {
        const check1 = localStorage.getItem("stockHotlist");

        // var axios = require("axios").default;

        // var options = {
        //   method: "GET",
        //   url: "https://yfapi.net/v11/finance/quoteSummary/AAPL",
        //   params: { modules: "defaultKeyStatistics,assetProfile" },
        //   headers: {
        //     "x-api-key": "RIFrduAEmH4ZWA5CdBpylaV31kKt8wUT2stzO3cs",
        //   },
        // };

        // axios
        //   .request(options)
        //   .then(function (response) {
        //     console.log(response.data);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });

        //--------------------------------------------//
        if (check1 !== null) {
            for (const key in JSON.parse(check1)) {
                setStockHotlist((stockHotlist) => [
                    ...stockHotlist,
                    JSON.parse(check1)[key]["symbol"],
                ]);
            }
        } else {
            var axios = require("axios").default;

            var options = {
                method: "GET",
                url: "https://yfapi.net/v1/finance/trending/us",

                headers: {
                    // "x-api-key": "mqGwUbeB2K1t2FFNFFXaV8mXEPBry3hX7rGo1R0n",
                    "x-api-key": "RIFrduAEmH4ZWA5CdBpylaV31kKt8wUT2stzO3cs",
                },
            };

            axios
                .request(options)
                .then(function (response) {
                    console.log(
                        response.data["finance"]["result"][0]["quotes"]
                    );
                    console.log(response.data);

                    localStorage.setItem(
                        "stockHotlist",
                        JSON.stringify(
                            response.data["finance"]["result"][0]["quotes"]
                        )
                    );
                    setStockHotlist(
                        JSON.stringify(
                            response.data["finance"]["result"][0]["quotes"]
                        )
                    );
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };

    const logoutbutton = () => {
        fetch("http://localhost:5050/api/logout", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.name) {
                    console.log("navigate to stock");
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.log("error occured in logout fetch");
            });
    };

    useEffect(() => {
        getStockHotlist();
    }, []);

    stockChartXValues.slice(-1);

    return (
        <div className="hotlist_container">
            <Sidebar />
            <div className="data_component">
                <h1 className="title">Hotlist</h1>
                <ul>
                    {stockHotlist.map((item) => {
                        return (
                            <div>
                                <a
                                    href={
                                        "https://finance.yahoo.com/quote/" +
                                        item
                                    }
                                >
                                    {item}
                                </a>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default StockList;
