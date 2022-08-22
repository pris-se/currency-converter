import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: null,
    isLoading: false,
    error: false,
  });
  const fetchData = useCallback(
    async (url) => {
      setFetchedData({ ...fetchedData, isLoading: true });
      try {
        const response = await fetch(url);
        const data = await response.json();
        setFetchedData({
          data,
          isLoading: false,
          error: false,
        });
      } catch (e) {
        setFetchedData({
          data: null,
          isLoading: false,
          error: true,
        });
        console.log(e.message);
      }
    },
    [url]
  );

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url, fetchData]);

  const { data, isLoading, error } = fetchedData;
  return { data, isLoading, error, fetchData };
};
