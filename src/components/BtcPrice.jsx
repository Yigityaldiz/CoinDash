import React, { useState, useEffect } from "react";
import axios from "axios";

const BtcPrice = () => {
  const btcPrice = [];
  const [degisim,setDegisim] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        );
        btcPrice.push({
          price: response.data.price,
          date: new Date().toLocaleString(),
        });
      
        localStorage.setItem("BTC", JSON.stringify(btcPrice));
      } catch (error) {
        console.log("Btc price error", error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      calculatePriceChange(btcPrice);
    }, 5000);
  }, []);

  const calculatePriceChange = (prices) => {
    const now = new Date();
    const oneMinutesAgo = new Date(now.getTime() - 60 * 1000);
   

    const lastTenPrices = prices.filter(
      (price) => price.date >= oneMinutesAgo.toLocaleString()
    );
   

    // lastTenPrices dizisinin boş olup olmadığını kontrol edin.
    if (lastTenPrices.length > 0) {
      const priceChange =
        lastTenPrices[lastTenPrices.length - 1].price - lastTenPrices[0].price;
         setDegisim(priceChange);
      // Fiyat değişimini döndürür.
      return priceChange;
    }
  };

  return (
    <div>
      <h1>Son 10 dakikanın fiyat değişimi: {degisim}</h1>
    </div>
  );
};

export default BtcPrice;
