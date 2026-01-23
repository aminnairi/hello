import { Button, Card, CardActions, CardContent, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, Typography, Zoom } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useCryptos } from "../hooks/useCryptos";
import { OpenInNew, ShowChart } from "@mui/icons-material";

export const Cryptos = () => {
  const { filteredCryptos, loadingCryptos, getCryptos } = useCryptos();

  const onCryptoListItemButtonClicked = useCallback((symbol: string) => () => {
    window.open(`https://www.binance.com/fr/trade/${symbol}`);
  }, []);

  useEffect(() => {
    getCryptos();
  }, [getCryptos]);

  return (
    <Card>
      <CardContent>
        <Zoom appear in={true}>
          <List>
            {loadingCryptos ? (
              <Stack spacing={3}>
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
                  {filteredCryptos.length === 0 ? (
                    <Typography align="center">
                      No matching cryptos.
                    </Typography>
                  ) : filteredCryptos.map((crypto, index) => (
                    <ListItem key={index}>
                      <ListItemButton onClick={onCryptoListItemButtonClicked(crypto.symbol)}>
                        <ListItemIcon>
                          <ShowChart />
                        </ListItemIcon>
                        <ListItemText primary={crypto.symbol} secondary={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(crypto.price)} />
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
      {!loadingCryptos && (
        <CardActions>
          <Button component={Link} href="https://www.binance.com/markets/overview" target="blank">
            More
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
