import { ContentCopy, OpenInNew, Share } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, IconButton, Skeleton, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useApplications } from "../hooks/useApplications";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useNotification } from "../hooks/useNotification";

export const Applications = () => {
  const { filteredApplications, loadingApplications, getApplications } = useApplications();
  const { openSuccessNotification, openErrorNotification } = useNotification();

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  const canShare = useMemo(() => {
    return typeof window.navigator.share === "function";
  }, []);

  const canCopy = useMemo(() => {
    return typeof window.navigator.clipboard === "object"
      && typeof window.navigator.clipboard.writeText === "function";
  }, []);

  const vibrate = useCallback(() => {
    if (typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  }, []);

  const errorVibration = useCallback(() => {
    if (typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }, []);

  const onApplicationListItemButtonClicked = useCallback((url: string) => () => {
    window.open(url);
  }, []);

  const onCopyIconButtonClick = useCallback((url: string) => () => {
    navigator.clipboard.writeText(url).then(() => {
      vibrate();
      openSuccessNotification("URL copied to clipboard!");
    }).catch(error => {
      errorVibration();
      openErrorNotification("Failed to copy to clipboard");
      console.error(error);
    });
  }, [errorVibration, openErrorNotification, openSuccessNotification, vibrate]);

  const onShareIconButtonClick = useCallback((title: string, url: string) => () => {
    navigator.share({
      title,
      url,
      text: `Navigate to ${title}: ${url}`,
    }).then(() => {
      vibrate();
      openSuccessNotification("Successfully shared link!");
    }).catch(error => {
      errorVibration();
      openErrorNotification("Failed to share link");
      console.error(error);
    });
  }, [errorVibration, openErrorNotification, openSuccessNotification, vibrate]);

  return (
    <Fragment>
      <Typography variant="h6">
        Applications
      </Typography>
      <Zoom appear in={true}>
        {loadingApplications ? (
          <Stack spacing={3} paddingBottom={3}>
            {Array.from(Array(3)).map((_, index) => (
              <Card>
                <CardContent>
                  <Stack direction="row" minWidth="300px" spacing={3} alignItems="center" key={index}>
                    <Skeleton variant="circular" width="40px" height="40px" />
                    <Stack flex="1">
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </Stack>
                    <Skeleton variant="rectangular" height="40px" width="40px" />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Zoom appear in={true}>
            <Stack spacing={3}>
              {filteredApplications.length === 0 ? (
                <Typography align="center">
                  No matching applications.
                </Typography>
              ) : filteredApplications.map((application) => (
                <Card key={application.identifier}>
                  <CardHeader title={application.name} subheader={new URL(application.url).host} />
                  <CardActions sx={{ justifyContent: "right" }}>
                    {canShare && (
                      <Tooltip title="Share URL">
                        <IconButton onClick={onShareIconButtonClick(application.name, application.url)}>
                          <Share />
                        </IconButton>
                      </Tooltip>
                    )}
                    {canCopy && (
                      <Tooltip title="Copy URL">
                        <IconButton onClick={onCopyIconButtonClick(application.url)}>
                          <ContentCopy />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Open">
                      <IconButton onClick={onApplicationListItemButtonClicked(application.url)}>
                        <OpenInNew />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Zoom>
        )}
      </Zoom>
    </Fragment>
  );
};
