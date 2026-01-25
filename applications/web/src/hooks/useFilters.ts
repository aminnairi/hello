import { useCallback } from "react";
import { useFilterState } from "../states/useFilterState";

export const useFilters = () => {
  const [filters, setFilters] = useFilterState();

  const toggleApplicationsFilter = useCallback(() => {
    setFilters(previousFilters => {
      return {
        ...previousFilters,
        applications: !previousFilters.applications,
      };
    });
  }, [setFilters]);

  const toggleCryptosFilter = useCallback(() => {
    setFilters(previousFilters => {
      return {
        ...previousFilters,
        cryptos: !previousFilters.cryptos,
      };
    });
  }, [setFilters]);

  return {
    filters,
    toggleApplicationsFilter,
    toggleCryptosFilter,
  };
};
