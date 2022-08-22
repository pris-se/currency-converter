import React from "react";
import { CurrencyOption } from "./CurrencyOption";

export const CurrencyField = ({ value, setCurrency, currency, handlerInput }) => {
  const onInputHandler = (amount) => {
    handlerInput(amount);
  };

  const handleSelect = (selectCurrency) => {
    setCurrency(selectCurrency);
  };

  return (
    <div className="flex items-center border-b border-slate-600 py-2 mt-5">
      <div className="inline-block relative max-w-max">
        <select
          value={currency}
          onChange={(e) => handleSelect(e.target.value)}
          className="block appearance-none w-max bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <CurrencyOption />
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder="Enter value"
        type="number"
        value={value}
        onInput={(e) => {
          onInputHandler(e.target.value);
        }}
      />
    </div>
  );
};
