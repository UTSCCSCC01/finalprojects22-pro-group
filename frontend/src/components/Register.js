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
import TAlert from "./alert"
import { ToastContainer } from "react-toastify";
import hpi from "./images/Homepage_image.jpg"

import './Register.css'

const theme = createTheme();

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const registerbutton = (e) => {
        if(email === ""){
            TAlert("Please Input email");
            return;
        }
        if(username === ""){
            TAlert("Please Input username");
            return;
        }
        if(password === ""){
            TAlert("Please Input password");
            return;
        }
        fetch("http://localhost:3000/api/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        })
        .then((response) => {
            if (response.status === 400) {
                TAlert("Register fail, check the information");
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
                console.log("error occured in fetch");
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
                    // backgroundImage:
                    //     "url(https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?cs=srgb&dl=pexels-energepiccom-159888.jpg&fm=jpg)",
                    // backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <img src={hpi} alt="home_image" className="Login-img"/>
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
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
                        Register
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        //onSubmit={registerbutton}
                    >
                        <TextField
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="button"
                            onClick={registerbutton}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <ToastContainer />
                        <Button
                            type="button"
                            onClick={() => navigate("/login")}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Go to Login
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Register;
