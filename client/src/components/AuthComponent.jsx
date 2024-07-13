import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import Swal from "sweetalert2";

const { baseURL } = config;

const AuthComponent = () => {
  const [authDetails, setAuthDetails] = useState({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsDisabled(authDetails.username === "" || authDetails.password === "");
  }, [authDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        authDetails
      );

      localStorage.setItem("access_token", response.data.data.access_token);
      if (response.data) {
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Login!",
      });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/register`,
        authDetails
      );
      if (response.status === 200) {
        setAuthDetails({
          username: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Register!",
      });
      console.error("Registration error:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={authDetails.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={authDetails.password}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="space-around" width="100%" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={isDisabled}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRegister}
            disabled={isDisabled}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthComponent;
