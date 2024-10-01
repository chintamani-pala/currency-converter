import { useState } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
      <div className="w-full max-w-md p-6 mx-auto bg-gray-800/80 backdrop-blur-md rounded-lg shadow-xl border border-gray-600">
        <h1 className="text-3xl text-center font-semibold text-gray-100 mb-6">
          Currency Converter
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectedCurrency={from}
            />
          </div>
          <div className="relative w-full flex justify-center mb-4">
            <button
              type="button"
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:rotate-90"
              onClick={swap}
            >
              ⇄
            </button>
          </div>
          <div className="mb-6">
            <InputBox
              label="To"
              currencyOptions={options}
              amount={Math.floor(convertedAmount * 100) / 100}
              onCurrencyChange={(currency) => setTo(currency)}
              selectedCurrency={to}
              amountDisabled
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
