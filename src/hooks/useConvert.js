import { useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { useFetch } from "./useFetch";

export const useConvert = (focusedFirst, firstInputCurrency, secondInputCurrency, amount = "") => {
  const debouncedAmount = useDebounce(amount, 500);
  const params = {
    from: focusedFirst ? firstInputCurrency : secondInputCurrency,
    to: focusedFirst ? secondInputCurrency : firstInputCurrency,
    amount: debouncedAmount,
    apikey: process.env.REACT_APP_API_KEY,
  };

  const { data, isLoading, error, fetchData } = useFetch();

  useEffect(() => {
    if (!amount) {
      return;
    }
    if (amount && debouncedAmount) {
      fetchData(
        "https://api.apilayer.com/exchangerates_data/convert?" + new URLSearchParams(params)
      );
    }
  }, [debouncedAmount, firstInputCurrency, secondInputCurrency, focusedFirst]);

  return {
    data,
    isLoading,
    error,
  };
};
