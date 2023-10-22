import React, { useState, useEffect } from "react";
import axios from "axios";

const BtcPrice = ({ setDegisim }) => {
  const [priceChange, setPriceChange] = useState(null);
  const [allPrices, setAllPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        );

        const newPrice = {
          price: response.data.price,
          date: new Date().toISOString(),
        };
        console.log(newPrice);

        let storedPrices = JSON.parse(localStorage.getItem("BTC")) || [];

        // Yeni fiyatı ekleyip, eski fiyatları temizle
        storedPrices = [newPrice, ...storedPrices];

        // Yeni fiyatı eklemek için localStorage.setItem'i buraya taşıdık
        localStorage.setItem("BTC", JSON.stringify(storedPrices));

        // Son 10 dakikanın fiyat değişimini hesapla ve ayarla
        const change = calculatePriceChange(storedPrices);
        setPriceChange(change);

        // Tüm fiyatları state'e at
        setAllPrices(storedPrices);
      } catch (error) {
        console.log("Btc price error", error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Component unmount olduğunda zamanlayıcıyı temizle
    return () => clearInterval(intervalId);
  }, []);

  const calculatePriceChange = (prices) => {
    const now = new Date();
    const oneMinutesAgo = new Date(now.getTime() - 60 * 1000);

    const lastTenPrices = prices.filter(
      (price) => new Date(price.date) >= oneMinutesAgo
    );

    // lastTenPrices dizisinin boş olup olmadığını kontrol edin.
    if (lastTenPrices.length > 0) {
      const priceChange =
         lastTenPrices[0].price -  lastTenPrices[lastTenPrices.length - 1].price;

      // Fiyat değişimini döndürür.
      setDegisim(priceChange);
    }
  };

  return (
    <div>
      <h1>Son 10 dakikanın fiyat değişimi: {priceChange}</h1>
      <h2>Geçmiş Tüm Fiyatlar</h2>
      <ul>
        {allPrices.map((price, index) => (
          <li key={index}>
            {price.date}: {price.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BtcPrice;
