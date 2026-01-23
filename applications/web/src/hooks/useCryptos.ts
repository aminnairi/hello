import { useCallback, useMemo, useState } from "react";
import { useCryptosState } from "../states/useCryptosState";
import { useSearch } from "./useSearch";
import { useRequest } from "./useRequest";
import { useToken } from "./useToken";

export const useCryptos = () => {
  const [cryptos, setCryptos] = useCryptosState();
  const [loadingCryptos, setLoadingCryptos] = useState(true);
  const { search } = useSearch();
  const { request } = useRequest();
  const { token } = useToken();

  const getCryptos = useCallback(() => {
    setLoadingCryptos(true);

    new Promise(resolve => setTimeout(resolve, 1_000)).then(() => {
      request("getCryptos", {
        token,
      }).then(response => {
        if (response instanceof Error) {
          return;
        }

        if (!response.success) {
          return;
        }

        setCryptos(response.cryptos);
      }).finally(() => {
        setLoadingCryptos(false);
      });
    })
  }, [request, setCryptos, token]);

  const filteredCryptos = useMemo(() => {
    const searchWords = search.trim().toLowerCase().split(/\s+/).filter(word => word !== "");

    return cryptos.filter(crypto => {
      const searchableString = crypto.symbol.toLowerCase();

      return searchWords.every(searchWord => {
        return searchableString.includes(searchWord);
      });
    });
  }, [cryptos, search]);

  const clearCryptos = useCallback(() => {
    setCryptos([]);
  }, [setCryptos]);

  return {
    cryptos,
    loadingCryptos,
    filteredCryptos,
    setCryptos,
    clearCryptos,
    getCryptos,
  };
};
