import { useCallback, useRef } from "react";
import { useSearchState } from "../states/useSearchState";
import { useSearchOpenedState } from "../states/useSearchOpenedState";

export const useSearch = () => {
  const [search, setSearch] = useSearchState();
  const [searchOpened, setSearchOpened] = useSearchOpenedState();
  const searchRef = useRef<HTMLInputElement>(null);

  const clearSearch = useCallback(() => {
    setSearch("");
  }, [setSearch]);

  const openSearch = useCallback(() => {
    setSearchOpened(true);
  }, [setSearchOpened]);

  const closeSearch = useCallback(() => {
    setSearchOpened(false);
  }, [setSearchOpened]);

  return {
    search,
    searchOpened,
    setSearch,
    openSearch,
    closeSearch,
    clearSearch,
    searchRef,
  };
};
