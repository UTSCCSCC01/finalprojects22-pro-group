import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;

function PaperTrading() {
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState(1000);
  const [cost, setCost] = useState(0);
  const [stock, setStock] = useState("");
  const [stockArray, setStockArray] = useState([]);
  var axios = require("axios").default;

  const buybutton = (e) => {
    fetch("http://localhost:5050/bot/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        console.log("response");

        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("data");

        console.log(data);
      })
      .catch((error) => {
        console.log("login needed");
      });
  };

  const buyLocalButton = (e) => {
    var options = {
      method: "GET",
      url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stock}`,

      headers: {
        // "x-api-key": "mqGwUbeB2K1t2FFNFFXaV8mXEPBry3hX7rGo1R0n",
        "x-api-key": "oZqkJXbM3LwpyKw6OpkI16oyiCwa3yR3bOoUXeTg",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        console.log(response.data.quoteResponse["result"][0]["ask"]);
        setCost(response.data.quoteResponse["result"][0]["ask"]);
      })
      .catch(function (error) {
        console.error(error);
      });
    if (balance - cost < 0) {
      alert("not enough funds");
    } else {
      setStockArray([...stockArray, stock]);
    }
  };
  useEffect(() => {
    setBalance(balance - cost);

    fetch("http://localhost:5050/api/buystock", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance, stock }),
    }).catch((error) => {
      console.log("error occured in login fetch");
    });
  }, [cost]);
  return (
    <>
      <div>
        <span>Buy stock</span>
        <div>Buy stock from Proview account</div>

        <StyledInput
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Search stock to buy"
        />
      </div>
      <button onClick={buyLocalButton}>buy stock</button>
      <div key="uniqueId1">Your Stock: {stock}</div>
      <div key="uniqueId2">Your cost: {cost}</div>
      <div key="uniqueId3">Bought:</div>

      {stockArray.map((item) => {
        return (
          <a target="_blank" href={"https://finance.yahoo.com/quote/" + item}>
            <div key={uuid()}>{item}</div>
          </a>
        );
      })}
      <div>Balance: {balance}</div>

      <div>Buy stock from IBKR</div>
      <button onClick={buybutton}>buy stock</button>
    </>
  );
}

export default PaperTrading;
