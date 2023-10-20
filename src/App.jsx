// src/App.js

import React from "react";
import BinanceFiyatTakip from "./components/BinanceFiyatTakip";
import BtcPrice from "./components/BtcPrice";

function App() {
  return (
    <div className="App">
      <BinanceFiyatTakip />
      <BtcPrice />
    </div>
  );
}

export default App;
