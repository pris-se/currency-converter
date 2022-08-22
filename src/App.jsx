import { useEffect, useState } from "react";
import { CurrencyField } from "./components/CurrencyField";
import { Header } from "./components/Header";
import { useConvert } from "./hooks/useConvert";

function App() {
  const [firstInputFocus, setFirstInputFocus] = useState(false);
  const [amount, setAmount] = useState();
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("UAH");
  const [firstInputValue, setFirstInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");

  // first input
  const handlerFirstInput = async (value) => {
    setFirstInputFocus(true);
    if (!Number(value)) {
      setFirstInputValue(value);
      setAmount("");
    } else {
      setFirstInputValue(value);
      setAmount(value);
    }
  };

  // second input
  const handlerSecondInput = (value) => {
    setFirstInputFocus(false);
    if (!Number(value)) {
      setSecondInputValue(value);
      setAmount("");
    } else {
      setSecondInputValue(value);
      setAmount(value);
    }
  };

  // data from API
  const {
    data: rate,
    isLoading: isConverting,
    error,
  } = useConvert(firstInputFocus, firstCurrency, secondCurrency, amount);

  useEffect(() => {
    // rate from API
    if (!isConverting && amount && firstInputFocus && rate?.result) {
      setSecondInputValue(rate?.result);
    }
    if (!isConverting && amount && !firstInputFocus && rate?.result) {
      setFirstInputValue(rate?.result);
    }
    // clear input
    if (!amount && firstInputFocus) {
      setSecondInputValue("");
    } else if (!amount && !firstInputFocus) {
      setFirstInputValue("");
    }
  }, [isConverting, rate, firstCurrency, secondCurrency, amount, firstInputFocus]);

  return (
    <>
      <div className="container mx-auto ">
        <Header />
        <main className="flex flex-col max-w-sm m-auto px-5">
          {error && <h1 className="text-center font-bold text-lg">Something went wrong</h1>}
          <CurrencyField
            value={firstInputValue}
            currency={firstCurrency}
            setCurrency={setFirstCurrency}
            handlerInput={handlerFirstInput}
          />
          <CurrencyField
            value={secondInputValue}
            currency={secondCurrency}
            setCurrency={setSecondCurrency}
            handlerInput={handlerSecondInput}
          />
          {isConverting && <h1 className="text-center text-lg">Please wait...</h1>}
        </main>
      </div>
    </>
  );
}

export default App;
