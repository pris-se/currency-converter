import { useEffect, useState } from "react";
import { CurrencyField } from "./components/CurrencyField";
import { getConvertedRates, getRates } from "./rateApi";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [currencies, setCurrencies] = useState(null);
  const [toCurrency, setToCurrency] = useState("UAH");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toValue, setToValue] = useState();
  const [fromValue, setFromValue] = useState();
  const [amount, setAmount] = useState();
  const debouncedAmount = useDebounce(amount, 1000);
  const [input, setInput] = useState();
  const [isConverting, setIsConverting] = useState(false);
  let currencyItem =
    currencies &&
    Object.keys(currencies).map((c) => (
      <li key={c}>
        {c} : {(1 / currencies[c]).toFixed(2)}
      </li>
    ));

  useEffect(() => {
    getRates().then((res) => setCurrencies(res?.rates));
  }, []);

  useEffect(() => {
    input === "to"
      ? getConvertedRates(toCurrency, fromCurrency, debouncedAmount)
          .then((res) => setFromValue(res?.result))
          .finally(() => setIsConverting(false))
      : getConvertedRates(fromCurrency, toCurrency, debouncedAmount)
          .then((res) => setToValue(res?.result))
          .finally(() => setIsConverting(false));
  }, [toCurrency, fromCurrency, debouncedAmount]);

  const handlerInputFrom = (amount) => {
    setIsConverting(true);
    setInput("from");
    setAmount(amount);
  };

  const handlerInputTo = (amount) => {
    setIsConverting(true);
    setInput("to");
    setAmount(amount);
  };

  return (
    <>
      <div className="container mx-auto ">
        <header className="flex flex-row justify-between py-5 px-5 bg-slate-600 text-slate-50">
          <div>Currency Converter</div>
          <div>
            <ul className="flex flex-row gap-2">{currencyItem}</ul>
          </div>
        </header>
        <main className="flex flex-col max-w-sm m-auto px-5">
          <CurrencyField
            setValue={setToValue}
            isConverting={isConverting}
            value={toValue}
            currency={toCurrency}
            setCurrency={setToCurrency}
            handlerInput={handlerInputTo}
          />
          <CurrencyField
            setValue={setFromValue}
            isConverting={isConverting}
            value={fromValue}
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            handlerInput={handlerInputFrom}
          />
        </main>
      </div>
    </>
  );
}

export default App;
