import { Box, Card, CardActions, CardHeader, IconButton, Skeleton, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useCryptos } from "../hooks/useCryptos";
import { ContentCopy, OpenInNew } from "@mui/icons-material";
import { useNotification } from "../hooks/useNotification";

export const Cryptos = () => {
  const { filteredCryptos, loadingCryptos, getCryptos } = useCryptos();
  const { openSuccessNotification, openErrorNotification } = useNotification();

  const onCryptoListItemButtonClicked = useCallback((symbol: string) => () => {
    window.open(`https://www.binance.com/fr/trade/${symbol}`);
  }, []);

  const vibrate = useCallback(() => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  }, []);

  const errorVibration = useCallback(() => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }, []);

  const onCopyIconButtonClick = useCallback((symbol: string) => () => {
    if (typeof window.navigator.clipboard === "object" && typeof window.navigator.clipboard.writeText === "function") {
      window.navigator.clipboard.writeText(`https://www.binance.com/fr/trade/${symbol}`).then(() => {
        openSuccessNotification("Copied to clipboard");
        vibrate();
      }).catch(error => {
        openErrorNotification("Failed to copy to clipboard");
        errorVibration();
        console.error(error);
      });
    }
  }, [errorVibration, openErrorNotification, openSuccessNotification, vibrate]);

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
          <Stack spacing={3} paddingBottom={3}>
            <Stack spacing={2}>
              {[1, 2, 3, 4].map((item) => (
                <Card
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
            {filteredCryptos.length === 0 ? (
              <Typography align="center">
                No matching cryptos.
              </Typography>
            ) : filteredCryptos.map((crypto, index) => (
              <Card key={index}>
                <CardHeader title={crypto.symbol} subheader={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(crypto.price)} />
                <CardActions sx={{ justifyContent: "right" }}>
                  <Tooltip title="Open in Binance">
                    <IconButton onClick={onCopyIconButtonClick(crypto.symbol)}>
                      <ContentCopy />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Open in Binance">
                    <IconButton onClick={onCryptoListItemButtonClicked(crypto.symbol)}>
                      <OpenInNew />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Zoom>
      )}
    </Stack>
  );
};
