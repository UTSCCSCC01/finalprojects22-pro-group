import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import Alarm from "./AlarmComp";
// import "fdweb/fluent.css"

function Stock() {
    const navigate = useNavigate();
    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);

    // const [StockSymbol, setStockSymbol] = useState("FB");

    const StockSymbol = "GOOG";
    const API_KEY = "THN5ITBH3LFSAWLV";

    // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

    const getStockRequest = async (StockSymbol) => {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

        const response = await fetch(url);
        await response.json().then((data) => {
            for (const key in data["Time Series (Daily)"]) {
                setStockChartXValues((stockChartXValues) => [
                    ...stockChartXValues,
                    key,
                ]);
                setStockChartYValues((stockChartYValues) => [
                    ...stockChartYValues,
                    data["Time Series (Daily)"][key]["1. open"],
                ]);
            }
        });
    };

    const logoutbutton = () => {
        fetch("http://localhost:3000/api/logout", {
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
        getStockRequest(StockSymbol);
    }, []);

    stockChartXValues.slice(-1);

    return (
        <>
            <div>
                <Button
                    type="button"
                    onClick={(e) => navigate("/alarmpage")}
                    fullWidth
                    variant="contained"
                    sx={{mt:3, mb: 2}}
                >
                    Set Alarm
                </Button>
                <h1>FB</h1>
                <Plot
                    data={[
                        {
                            x: stockChartXValues,
                            y: stockChartYValues,
                            type: "scatter",
                            mode: "lines+markers",
                            marker: { color: "blue" },
                        },
                    ]}
                    layout={{
                        width: 720,
                        height: 500,
                        title: "StockSymbol",
                        xaxis: { title: "TIME" },
                        yaxis: { title: "COST" },
                    }}
                />
                <Button
                    type="button"
                    onClick={() => navigate("/login")}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Back to Login
                </Button>
                <Button
                    type="button"
                    onClick={logoutbutton}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Logout
                </Button>
                
            </div>
        </>
    );
}

export default Stock;
