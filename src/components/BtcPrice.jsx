import React, { useState, useEffect } from "react";
import axios from "axios";

const BtcPrice = () => {
  const btcPrice = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        );
        btcPrice.push(response.data.price);
        localStorage.setItem("BTC", JSON.stringify(btcPrice));
      } catch (error) {
        console.log("Btc price error", error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      console.log(btcPrice);
    }, 60000);
  }, []);
};

export default BtcPrice;
