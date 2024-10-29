import React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ onSignUp }) => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    onSignUp();
    navigate('/');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        height: "100vh",
        backgroundColor: "#f8f8f8",
        padding: "20px",
      }}
    >
      <Box
        style={{
          width: "300px",
          padding: "30px",
          borderRadius: "20px",
          border: "2px solid #ccc",
          textAlign: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "30px" }}>
          Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          variant="standard"
          InputLabelProps={{ style: { color: "#BDBDBD" } }}
        />
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
            marginTop: "30px",
            padding: "10px 0",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
          onClick={handleSignUp}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpPage;
