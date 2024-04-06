import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosError } from "axios";
import { loginRequest } from "../api/apiRequests";

import useSignIn from "react-auth-kit/hooks/useSignIn";

import { Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [formValuesMiss, setFormValuesMiss] = useState(false);
  const [error, setError] = useState("");

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleError = (message) => {
    setError(message);
    setEmail("");
    setPassword("");
    setInvalidLogin(true);
  };

  useEffect(() => {
    const resetErrorMsg = setTimeout(() => {
      if (invalidLogin) {
        setInvalidLogin(false);
      }
      if (formValuesMiss) {
        setFormValuesMiss(false);
      }
    }, 5000);
    return () => clearTimeout(resetErrorMsg);
  }, [invalidLogin]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setFormValuesMiss(true);
    }
    try {
      const response = await loginRequest({ email: email, password: password });
      setPassword("");
      setEmail("");
      signIn({
        auth: {
          token: response.data.accessToken,
          type: "Bearer",
        },
        userState: {
          email: response.data.user.email,
          id: response.data.user.id,
        },
      });
      navigate("/tasks");
    } catch (err) {
      if (err && err instanceof AxiosError) {
        handleError(err.response?.data.message);
      } else if (err && err instanceof Error) {
        handleError(err.message);
        console.log("Error: ", err);
      }
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          minWidth: 360,
          maxWidth: 720,
          width: "fit-content",
          height: "fit-content",
        }}
      >
        <form noValidate onSubmit={onSubmit}>
          <Box
            sx={{
              display: `flex`,
              flexDirection: `column`,
              alignContent: `center`,
              padding: `20px`,
            }}
          >
            <Typography
              sx={{ textAlign: `center`, fontSize: `24px`, color: `#0047AB` }}
            >
              Task Manager Login
            </Typography>
            <TextField
              error={invalidLogin || formValuesMiss}
              margin="normal"
              size="small"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              error={invalidLogin || formValuesMiss}
              margin="normal"
              size="small"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outlined" type="submit">
              Login
            </Button>
            {}
            {invalidLogin ? (
              <Alert severity="error">
                {formValuesMiss
                  ? "Login and Password are required!"
                  : "Wrong Login or Password"}
              </Alert>
            ) : (
              ""
            )}
          </Box>
        </form>
      </Card>
    </Paper>
  );
};

export default Login;
