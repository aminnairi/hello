import { Box, Card, CardActionArea, CardActions, CardHeader, Grid, IconButton, Skeleton, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useCryptos } from "../hooks/useCryptos";
import { ContentCopy, StackedLineChart } from "@mui/icons-material";
import { useNotification } from "../hooks/useNotification";
import { useVibration } from "../hooks/useVibration";

export const Cryptos = () => {
  const { filteredCryptos, loadingCryptos, getCryptos } = useCryptos();
  const { openSuccessNotification, openErrorNotification } = useNotification();
  const { regularVibration, errorVibration } = useVibration();

  const onCryptoListItemButtonClicked = useCallback((symbol: string) => () => {
    window.open(`https://www.binance.com/fr/trade/${symbol}`);
  }, []);

  const onCopyIconButtonClick = useCallback((symbol: string) => () => {
    if (typeof window.navigator.clipboard === "object" && typeof window.navigator.clipboard.writeText === "function") {
      window.navigator.clipboard.writeText(`https://www.binance.com/fr/trade/${symbol}`).then(() => {
        openSuccessNotification("Copied to clipboard");
        regularVibration();
      }).catch(error => {
        openErrorNotification("Failed to copy to clipboard");
        errorVibration();
        console.error(error);
      });
    }
  }, [errorVibration, openErrorNotification, openSuccessNotification, regularVibration]);

  useEffect(() => {
    getCryptos();
  }, [getCryptos]);

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        Cryptos
      </Typography>
      {loadingCryptos ? (
        <Zoom appear in={true}>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((element) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={element}>
                <Card raised>
                  <CardHeader
                    avatar={<Skeleton variant="rectangular" width={20} height={30} />}
                    title={<Skeleton variant="text" sx={{ width: '30%', height: 30 }} />}
                    subheader={<Skeleton variant="text" sx={{ width: '30%', height: 30 }} />}
                  />
                  <CardActions sx={{ justifyContent: "right" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                      <Skeleton variant="rectangular" width={20} height={20} />
                      <Skeleton variant="rectangular" width={20} height={20} />
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Zoom>
      ) : (
        <Zoom appear in={true}>
          <Grid container spacing={3}>
            {filteredCryptos.length === 0 ? (
              <Typography align="center">
                No matching cryptos.
              </Typography>
            ) : filteredCryptos.map(crypto => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={crypto.symbol}>
                <Card raised>
                  <CardActionArea onClick={onCryptoListItemButtonClicked(crypto.symbol)}>
                    <CardHeader
                      avatar={<StackedLineChart />}
                      title={crypto.symbol}
                      subheader={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(crypto.price)}
                    />
                    <CardActions sx={{ justifyContent: "right" }}>
                      <Tooltip title="Open in Binance">
                        <IconButton onClick={onCopyIconButtonClick(crypto.symbol)} size="small">
                          <ContentCopy />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Zoom>
      )}
    </Stack>
  );
};
