import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Typography, Button, Alert } from "@mui/material";

// import firebase from "../firebase";
const Login = () => {
  const [userdata, setUserData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, userdata.email, userdata.password);
      navigate("/home");
    } catch (error) {
      const errorMessage = error.message;
      setLoginError(errorMessage);
    }
  };

  return (
    <Box sx={{ margin: "20px auto", padding: "20px" }}>
      <Typography sx={{ marginX: "auto" }} variant="h4">
        Login Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ margin: "20px auto" }}
          variant="standard"
          type="email"
          label="Email"
          fullWidth
          required
          value={userdata.email}
          name="email"
          onChange={handleChange}
          autoComplete="off"
        />

        <TextField
          sx={{ margin: "20px auto" }}
          variant="standard"
          type="password"
          label="Password"
          fullWidth
          required
          name="password"
          value={userdata.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <Box>
          <Button
            disableRipple
            variant="contained"
            color="warning"
            type="submit"
          >
            Login
          </Button>
        </Box>
      </form>
      <Box sx={{ margin: "20px auto" }}>
        {loginError && <Alert severity="error">{loginError}</Alert>}
      </Box>
    </Box>
  );
};

export default Login;
