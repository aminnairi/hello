import { useCallback, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useNotification } from "../hooks/useNotification";
import { Button, Card, CardContent, Modal, Stack, TextField } from "@mui/material";
import { useToken } from "../hooks/useToken";
import { useRequest } from "../hooks/useRequest";

export const SignInModalForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const { token, setToken } = useToken();
  const signInModalOpened = useMemo(() => token.trim().length === 0, [token]);
  const { openSuccessNotification, openErrorNotification } = useNotification();
  const { request } = useRequest();

  const onUserNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const onSignInFormSubmitted = useCallback((event: FormEvent) => {
    event.preventDefault();
    setSignInLoading(true);

    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      request("signIn", {
        userName,
        password,
      }).then(response => {
        if (response instanceof Error) {
          openErrorNotification("Error while signing in, invalid credentials");
          return;
        }

        if (!response.success) {
          openErrorNotification("Error while signing in, invalid credentials");
          return;
        }

        setUserName("");
        setPassword("");
        openSuccessNotification("Successfully signed in!");
        setToken(response.token);
      }).finally(() => {
        setSignInLoading(false);
      });
    });
  }, [openErrorNotification, openSuccessNotification, password, request, setToken, userName]);

  return (
    <Modal open={signInModalOpened} slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)" } } }}>
      <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", outline: "none" }}>
        <CardContent>
          <Stack component="form" spacing={3} onSubmit={onSignInFormSubmitted}>
            <TextField label="User Name" size="small" value={userName} onChange={onUserNameChange} disabled={signInLoading} autoFocus />
            <TextField label="Password" type="password" size="small" value={password} onChange={onPasswordChange} disabled={signInLoading} />
            <Button size="small" variant="contained" sx={{ alignSelf: "center" }} type="submit" loading={signInLoading}>
              Sign In
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  );
}
