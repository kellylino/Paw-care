import React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo-no-background.png"; // Ensure this path is correct
import videoSource from "./assets/back.mp4"; // Ensure this path is correct

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={videoSource} type="video/mp4" />
        {/* Fallback Text if Video Fails to Load */}
        Your browser does not support the video tag.
      </video>

      {/* Logo and Tagline */}
      <Box
        position="absolute"
        top="20px"
        left="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <img src={logo} alt="Paw Care Logo" style={{ width: "120px" }} />
        <Typography
          variant="subtitle1"
          style={{
            color: "#000000",
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "500",
          }}
        >
          Trusted pet sitters and walkers at your fingertips.
          <br />
          Care for your pets, whenever you need it.
        </Typography>
      </Box>

      {/* Login Form */}
      <Box
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="standard"
          InputLabelProps={{ style: { color: "#BDBDBD" } }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="standard"
          InputLabelProps={{ style: { color: "#BDBDBD" } }}
        />
        <Button
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#6C63FF",
            color: "#FFFFFF",
            marginTop: "20px",
            padding: "10px 0",
            fontWeight: "bold",
          }}
          onClick={onLogin}
        >
          Login
        </Button>
        <Box display="flex" justifyContent="space-between" marginTop="10px">
          <Typography variant="body2">
            <a href="#forgot-password" style={{ color: "#6C63FF", textDecoration: "none" }}>
              Forgot <span style={{ fontWeight: "bold" }}>Password?</span>
            </a>
          </Typography>
          <Typography variant="body2">
            <a
              href="#signup"
              style={{ color: "#6C63FF", textDecoration: "none" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Don’t have an account? <span style={{ fontWeight: "bold" }}>Signup</span>
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
