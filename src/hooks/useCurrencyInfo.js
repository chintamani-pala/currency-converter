import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const getData = async () => {
    const response = await fetch(
      `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`
    );
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    const fetchCurrencyData = async () => {
      const curData = await getData();
      setData(curData[currency]); // Ensure the data is awaited
    };

    fetchCurrencyData();
  }, [currency]);
  console.log(data);

  return data;
}

export default useCurrencyInfo;
