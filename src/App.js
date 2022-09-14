import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./component/Dropdown";

const cryptoData = ["BTC", "ETH"];
const currencyData = ["GBP", "EUR"];

function App() {
  const [cryptoValue, setCryptoValue] = useState("BTC");
  const [currencyValue, setCurrencyValue] = useState("GBP");
  const [startingValue, setStartingValue] = useState("X");
  const [amountValue, setAmountValue] = useState(0);

  useEffect(() => {
    if (amountValue > 0) {
      //apply debounce
      const timeOutId = setTimeout(() => fetchData(), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [amountValue,cryptoValue,currencyValue]);

  const fetchData = async () => {
    let apiUrl =
      "https://api.kraken.com/0/public/Ticker?pair=" +
      cryptoValue +
      currencyValue;

    const response = await axios.get(apiUrl);
    if (response?.data?.result) {
      let responseData = response?.data?.result;
      let arrkey = Object.keys(responseData)[0];
      let arrResult = responseData[arrkey]?.a[0];
      setStartingValue(arrResult);
    }
  };

  const handleAmount = (e) => {
    setAmountValue(e.target.value);
  };

  const convertRate = () => parseInt(startingValue) * parseInt(amountValue);

  let convertedValue = convertRate() ? convertRate() : "XXX";

  return (
    <div className="App">
      <Dropdown
        placeholder="Crypto"
        options={cryptoData}
        value={cryptoValue}
        handleDropDown={(e) => setCryptoValue(e.target.value)}
        name="cryptoValue"
      />

      <Dropdown
        placeholder="Currency"
        value={currencyValue}
        name="currencyValue"
        options={currencyData}
        handleDropDown={(e) => setCurrencyValue(e.target.value)}
      />

      <br />

      <label>Amount</label>
      <input
        value={amountValue}
        name="Amount"
        placeholder="100"
        onChange={handleAmount}
      />
      <br />
      <input
        value={`1 ${cryptoValue} is ${startingValue} ${currencyValue}`}
        disabled
      />
      <br />
      <input
        value={`${amountValue} ${cryptoValue} is ${convertedValue} ${currencyValue}`}
        disabled
      />
    </div>
  );
}

export default App;
