import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ onSignUp }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const requestBody = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        onSignUp();
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Error: ", errorData);
        // You can handle error display here (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error: ", error);
      // You can handle error display here (e.g., show an error message)
    }
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="standard"
          InputLabelProps={{ style: { color: "#BDBDBD" } }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="standard"
          InputLabelProps={{ style: { color: "#BDBDBD" } }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
