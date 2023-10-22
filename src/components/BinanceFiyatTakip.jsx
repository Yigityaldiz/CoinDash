import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

const BinanceFiyatTakip = ({ degisim }) => {
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
    }, 1000);

    // Component unmount olduğunda zamanlayıcıyı temizle
    return () => clearInterval(intervalId);
  }, []); // Boş bağımlılık dizisi sadece componentDidMount benzeri bir davranış elde etmek için

  return (
    <div className=" ">
      <Navbar />

      <div className="rounded-lg p-4 ">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  #
                </th>
                <th scope="col" class="px-6 py-3">
                  Coin Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Last Update
                </th>
                <th scope="col" class="px-6 py-3">
                  1m Change
                </th>
              </tr>
            </thead>
            <tbody>
              {kriptoBirimler.map((birim, index) => (
                <tr
                  key={index}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td class="px-6 py-4 font-medium">1</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {birim.symbol}
                  </th>

                  <td class="px-6 py-4 font-bold">
                    {" "}
                    <span style={{ color: birim.fiyat > 0 ? "white" : "red" }}>
                      {birim.fiyat || "Yükleniyor..."}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {birim.guncellemeZamani}
                  </td>
                  <td>
                    {" "}
                    <span style={{ color: degisim > 0 ? "green" : "red" }}>
                      {degisim}$
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BinanceFiyatTakip;
{
}
