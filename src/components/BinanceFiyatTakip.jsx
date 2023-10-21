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
    // <div className=" h-screen w-[100%]   ">
     
    //   {kriptoBirimler.map((birim, index) => (
    //     <div key={index}>
    //       <p>
    //         {birim.symbol} Fiyatı:{" "}
    //         <span style={{ color: birim.fiyat > 0 ? "green" : "red" }}>
    //           {birim.fiyat || "Yükleniyor..."}
    //         </span>
    //       </p>
    //       <p>Son Güncelleme: {birim.guncellemeZamani}</p>
    //     </div>
    //   ))} 
    // </div>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a  class="flex items-center">
     
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CoinDash</span>
  </a>
  <div class="flex md:order-2">
    
     
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
    
  </div>
  </div>
</nav>



  );
};

export default BinanceFiyatTakip;
{
  
}
