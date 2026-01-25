import { Chip, Stack } from "@mui/material";
import { useFilters } from "../hooks/useFilters";
import { useMemo } from "react";

export const Filters = () => {
  const { filters, toggleApplicationsFilter, toggleCryptosFilter } = useFilters();

  const applicationsChipVariant = useMemo(() => {
    if (filters.applications) {
      return "filled";
    }

    return "outlined";
  }, [filters.applications])

  const applicationsChipColor = useMemo(() => {
    if (filters.applications) {
      return "primary";
    }

    return undefined;
  }, [filters.applications])

  const cryptosChipVariant = useMemo(() => {
    if (filters.cryptos) {
      return "filled";
    }

    return "outlined";
  }, [filters.cryptos])

  const cryptosChipColor = useMemo(() => {
    if (filters.cryptos) {
      return "primary";
    }

    return undefined;
  }, [filters.cryptos])

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Apps"
        onClick={toggleApplicationsFilter}
        variant={applicationsChipVariant}
        color={applicationsChipColor}
      />
      <Chip
        label="Cryptos"
        onClick={toggleCryptosFilter}
        variant={cryptosChipVariant}
        color={cryptosChipColor}
      />
    </Stack>
  );
};
