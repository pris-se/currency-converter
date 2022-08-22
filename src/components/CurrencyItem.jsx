import React from "react";

export const CurrencyItem = ({ currencies }) => {
  return Object.keys(currencies?.rates).map((c) => (
    <li key={c}>
      {c} : {(1 / currencies?.rates[c]).toFixed(2)}
    </li>
  ));
};
