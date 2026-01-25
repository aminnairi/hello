import { ContentCopy, PhoneIphone, Share } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardActions, CardHeader, IconButton, Skeleton, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useApplications } from "../hooks/useApplications";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useNotification } from "../hooks/useNotification";
import { useVibration } from "../hooks/useVibration";

export const Applications = () => {
  const { filteredApplications, loadingApplications, getApplications } = useApplications();
  const { openSuccessNotification, openErrorNotification } = useNotification();
  const { regularVibration, errorVibration } = useVibration();

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

  const onApplicationListItemButtonClicked = useCallback((url: string) => () => {
    window.open(url);
  }, []);

  const onCopyIconButtonClick = useCallback((url: string) => () => {
    navigator.clipboard.writeText(url).then(() => {
      regularVibration();
      openSuccessNotification("URL copied to clipboard!");
    }).catch(error => {
      errorVibration();
      openErrorNotification("Failed to copy to clipboard");
      console.error(error);
    });
  }, [errorVibration, openErrorNotification, openSuccessNotification, regularVibration]);

  const onShareIconButtonClick = useCallback((title: string, url: string) => () => {
    navigator.share({
      title,
      url,
      text: `Navigate to ${title}: ${url}`,
    }).then(() => {
      regularVibration();
      openSuccessNotification("Successfully shared link!");
    }).catch(error => {
      errorVibration();
      openErrorNotification("Failed to share link");
      console.error(error);
    });
  }, [errorVibration, openErrorNotification, openSuccessNotification, regularVibration]);

  return (
    <Fragment>
      <Typography variant="h6">
        Applications
      </Typography>
      {loadingApplications ? (
        <Zoom appear in={true}>
          <Stack spacing={3} paddingBottom={3}>
            <Stack spacing={2}>
              {[1, 2, 3, 4].map((item) => (
                <Card
                  raised
                  key={item}
                  sx={{
                    bgcolor: '#1e293b', // Couleur sombre du fond des cartes
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid #334155',
                    position: 'relative'
                  }}
                >
                  {/* Titre de l'application */}
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: 'grey.700', width: '30%', height: 30 }}
                  />

                  {/* URL / Sous-titre */}
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: 'grey.800', width: '50%', height: 20 }}
                  />

                  {/* Icônes en bas à droite */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                    <Skeleton
                      variant="rectangular"
                      width={20}
                      height={20}
                      sx={{ bgcolor: 'grey.700', borderRadius: 0.5 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={20}
                      height={20}
                      sx={{ bgcolor: 'grey.700', borderRadius: 0.5 }}
                    />
                  </Box>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Zoom>
      ) : (
        <Zoom appear in={true}>
          <Stack spacing={3}>
            {filteredApplications.length === 0 ? (
              <Typography align="center">
                No matching applications.
              </Typography>
            ) : filteredApplications.map((application) => (
              <Card key={application.identifier} raised>
                <CardActionArea onClick={onApplicationListItemButtonClicked(application.url)}>
                  <CardHeader
                    avatar={<PhoneIphone />}
                    title={application.name}
                    subheader={new URL(application.url).host} />
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
                  </CardActions>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </Zoom>
      )}
    </Fragment>
  );
};
