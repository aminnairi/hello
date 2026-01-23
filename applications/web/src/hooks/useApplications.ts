import { useCallback, useMemo, useState } from "react";
import { useApplicationsState } from "../states/useApplicationsState";
import { useSearch } from "./useSearch";
import { useToken } from "./useToken";
import { useRequest } from "./useRequest";

export const useApplications = () => {
  const { search } = useSearch();
  const [applications, setApplications] = useApplicationsState();
  const [loadingApplications, setLoadingApplications] = useState(true);
  const { request } = useRequest();
  const { token } = useToken();

  const getApplications = useCallback(() => {
    setLoadingApplications(true);

    new Promise(resolve => setTimeout(resolve, 1_000)).then(() => {
      request("getApplications", {
        token
      }).then(response => {
        if (response instanceof Error) {
          return;
        }

        if (!response.success) {
          return;
        }

        setApplications(response.applications);
      }).finally(() => {
        setLoadingApplications(false);
      });
    });
  }, [request, setApplications, token]);

  const filteredApplications = useMemo(() => {
    const searchWords = search.trim().toLowerCase().split(/\s+/).filter(word => word !== "");

    return applications.filter(application => {
      const applicationName = application.name.toLowerCase();

      return searchWords.every(searchWord => {
        return applicationName.includes(searchWord);
      });
    });
  }, [applications, search]);

  const clearApplications = useCallback(() => {
    setApplications([]);
  }, [setApplications]);

  return {
    applications,
    loadingApplications,
    filteredApplications,
    setApplications,
    clearApplications,
    getApplications,
  };
};
