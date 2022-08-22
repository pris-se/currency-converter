import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { CurrencyItem } from "./CurrencyItem";

export const Header = () => {
  const mainCurrencies = ["USD", "EUR"];
  const baseCurrency = "UAH";

  const params = {
    symbols: mainCurrencies,
    base: baseCurrency,
    apikey: process.env.REACT_APP_API_KEY,
  };

  const {
    data: currencies,
    isLoading,
    error,
  } = useFetch("https://api.apilayer.com/exchangerates_data/latest?" + new URLSearchParams(params));

  return (
    <header className="flex flex-row justify-between py-5 px-5 bg-slate-600 text-slate-50">
      <div>Currency Converter</div>
      <div>
        {currencies && (
          <ul className="flex flex-row gap-2">
            <CurrencyItem currencies={currencies} />
          </ul>
        )}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
      </div>
    </header>
  );
};
