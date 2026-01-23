import { OpenInNew, Public } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, Typography, Zoom } from "@mui/material";
import { useApplications } from "../hooks/useApplications";
import { useCallback, useEffect } from "react";

export const Applications = () => {
  const { filteredApplications, loadingApplications, getApplications } = useApplications();

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  const onApplicationListItemButtonClicked = useCallback((url: string) => () => {
    window.open(url);
  }, []);

  return (
    <Card>
      <CardContent>
        <Zoom appear in={true}>
          <List>
            {loadingApplications ? (
              <Stack spacing={3} paddingBottom={3}>
                {Array.from(Array(3)).map((_, index) => (
                  <Stack direction="row" minWidth="300px" spacing={3} alignItems="center" key={index}>
                    <Skeleton variant="circular" width="40px" height="40px" />
                    <Stack flex="1">
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </Stack>
                    <Skeleton variant="rectangular" height="40px" width="40px" />
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Zoom appear in={true}>
                <Stack>
                  {filteredApplications.length === 0 ? (
                    <Typography align="center">
                      No matching applications.
                    </Typography>
                  ) : filteredApplications.map((application) => (
                    <ListItem key={application.identifier}>
                      <ListItemButton onClick={onApplicationListItemButtonClicked(application.url)}>
                        <ListItemIcon>
                          <Public />
                        </ListItemIcon>
                        <ListItemText primary={application.name} secondary={new URL(application.url).host} />
                        <ListItemIcon sx={{ paddingLeft: 3 }}>
                          <OpenInNew />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </Stack>
              </Zoom>
            )}
          </List>
        </Zoom>
      </CardContent>
      {!loadingApplications && (
        <CardActions>
          <Button component={Link} href="https://selfh.st/apps/" target="blank">
            More
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
