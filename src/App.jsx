// src/App.js

import React from "react";
import BinanceFiyatTakip from "./components/BinanceFiyatTakip";
import BtcPrice from "./components/BtcPrice";
import { useState } from "react";

function App() {
  const [degisim, setDegisim] = useState();
  const [degisimm, setDegisimm] = useState();
  const cantSee = true;
  return (
    <div className="h-screen bg-gray-900">
      <BinanceFiyatTakip degisim={degisim} />

      {cantSee && <BtcPrice degisim={degisim} setDegisim={setDegisim} />}
    </div>
  );
}

export default App;
