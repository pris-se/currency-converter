const mainCurrencies = ["USD", "EUR"];
const baseCurrency = "UAH";

const myHeaders = new Headers({ apikey: "vRHuYNeTp9dODguhk3vQWWgb8l0ABRum" });
const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export const getRates = async () => {
  const params = new URLSearchParams({
    symbols: mainCurrencies,
    base: baseCurrency,
  });
  try {
    const res = await fetch(
      `https://api.apilayer.com/exchangerates_data/latest?` + params,
      requestOptions
    );

    const data = res.json();
    return data;
  } catch (e) {
    alert("API is not response");
  }
};

export const getConvertedRates = async (from, to, amount) => {
  const params = {
    to,
    from,
    amount,
  };
  const conditional = Object.values(params).includes(null || undefined);
  if (conditional) return;
  try {
    const res = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?` + new URLSearchParams(params),
      requestOptions
    );

    const data = res.json();
    return data;
  } catch (e) {
    alert("API is not response");
  }
  return {
    result: amount * 0.5,
  };
};
