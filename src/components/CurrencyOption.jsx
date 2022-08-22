import React from "react";

export const CurrencyOption = () => {
  const currenciesForConvert = ["USD", "UAH", "EUR"];
  return currenciesForConvert.map((o, idx) => (
    <option key={idx} value={o}>
      {o}
    </option>
  ));
};
