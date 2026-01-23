import { Card, CardContent, Stack, Typography, Zoom } from "@mui/material";
import { useEffect, useState } from "react";

export const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalIdentifier = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalIdentifier);
    };
  }, []);

  return (
    <Zoom appear in={true}>
      <Card>
        <CardContent>
          <Stack spacing={3} justifyContent="center" alignItems="center">
            <Typography variant="body1" align="center">
              {new Intl.DateTimeFormat("fr-FR", { timeStyle: "medium" }).format(date)}
            </Typography>
            <Typography variant="body2" align="center">
              {new Intl.DateTimeFormat("fr-FR", { dateStyle: "full" }).format(date)}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Zoom>
  );
}
