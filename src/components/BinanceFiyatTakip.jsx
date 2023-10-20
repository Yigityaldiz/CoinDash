import React, { useState, useEffect } from "react";
import axios from "axios";

const BinanceFiyatTakip = () => {
  const [kriptoBirimler, setKriptoBirimler] = useState([
    { symbol: "BTCUSDT", fiyat: null, guncellemeZamani: null },
    { symbol: "ETHUSDT", fiyat: null, guncellemeZamani: null },
    { symbol: "BNBUSDT", fiyat: null, guncellemeZamani: null },
    { symbol: "AVAXUSDT", fiyat: null, guncellemeZamani: null },
    { symbol: "MINAUSDT", fiyat: null, guncellemeZamani: null },
    { symbol: "TRBUSDT", fiyat: null, guncellemeZamani: null },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = kriptoBirimler.map(async (birim) => {
          const response = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${birim.symbol}`
          );

          const updatedBirim = {
            ...birim,
            fiyat: response.data.price,
            guncellemeZamani: new Date().toLocaleString(),
          };

          return updatedBirim;
        });

        const updatedData = await Promise.all(promises);
        setKriptoBirimler(updatedData);
      } catch (error) {
        console.error("Binance API hatası:", error);
      }
    };

    fetchData();

    // Belirli aralıklarla güncelleme için bir zamanlayıcı ekle (örneğin, her 5 saniyede bir)
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    // Component unmount olduğunda zamanlayıcıyı temizle
    return () => clearInterval(intervalId);
  }, []); // Boş bağımlılık dizisi sadece componentDidMount benzeri bir davranış elde etmek için

  return (
    <div className="border-2 p-2">
      <h1>Kripto Para Birimleri</h1>
      {kriptoBirimler.map((birim, index) => (
        <div key={index}>
          <p>
            {birim.symbol} Fiyatı:{" "}
            <span style={{ color: birim.fiyat > 0 ? "green" : "red" }}>
              {birim.fiyat || "Yükleniyor..."}
            </span>
          </p>
          <p>Son Güncelleme: {birim.guncellemeZamani}</p>
        </div>
      ))}
    </div>
  );
};

export default BinanceFiyatTakip;
