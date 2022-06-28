import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import hpi from "./images/Homepage_image.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const theme = createTheme();

function Reset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  fetch("http://localhost:3000/api/profile", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.name) {
        navigate("/stock");
      }
    })
    .catch((error) => {
      console.log("login needed");
    });

  const reset_button = (e) => {
    fetch("http://localhost:3000/api/reset", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.status === 400) {
          toast.error("Information is Invalid!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.name) {
          console.log("navigate to stock");
          navigate("/stock");
        }
      })
      .catch((error) => {
        console.log("error occured in login fetch");
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <img src={hpi} alt="home_image" className="Login-img" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            //noValidate
            sx={{ mt: 1 }}
            //onSubmit={reset_button}
          >
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              //autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              //autoComplete="current-password"
            />
            <Button
              type="button"
              onClick={reset_button}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <ToastContainer />
            <Button
              type="button"
              onClick={(e) => navigate("/login")}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Reset;
