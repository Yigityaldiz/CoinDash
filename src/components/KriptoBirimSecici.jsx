// src/components/KriptoBirimSecici.jsx

import React, { useState } from "react";

const KriptoBirimSecici = ({ seciliBirim, onBirimSec }) => {
  const [secim, setSecim] = useState(seciliBirim);

  const birimleri = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "LTCUSDT"]; // İzlemek istediğiniz kripto birimlerinin sembollerini ekleyin

  return (
    <div>
      {/* <label>Kripto Para Birimi:</label>
      <select value={secim} onChange={(e) => setSecim(e.target.value)}>
        {birimleri.map((birim) => (
          <option key={birim} value={birim}>
            {birim}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default KriptoBirimSecici;
