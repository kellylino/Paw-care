import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo-no-background.png";
import settingsIcon from "./assets/settings-icon.png";
import ownerImage from "./assets/owner.png";
import catImage from "./assets/cat.png";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f3f3f3",
        position: "relative",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="30px"
        style={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" alignItems="center" gap="10px">
          <img
            src={logo}
            alt="Paw Care Logo"
            style={{ width: "120px", height: "60px" }}
          />
        </Box>
        <Button
          color="primary"
          onClick={() => navigate("/")}
          style={{
            color: "#6C63FF",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Log out
        </Button>
      </Box>

      <Container
        maxWidth="xs"
        style={{
          textAlign: "center",
          marginTop: "40px",
          color: "#000000",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
          WELCOME TO THE PAW-TY, <span style={{ color: "#6C63FF" }}>USER_NAME</span>!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Tell us a bit about yourself:
          <br />
          Are you a pet owner or a caregiver?
        </Typography>
        <Typography variant="h5" style={{ fontWeight: "bold", marginTop: "10px" }}>
          LET'S GET STARTED!
        </Typography>

        {/* Profile Creation Buttons */}
        <Box display="flex" justifyContent="center" gap="20px" marginTop="30px">
          <Button
            variant="outlined"
            onClick={() => navigate("/create-pet-owner-profile")}
            startIcon={
              <img
                src={ownerImage}
                alt="Pet Owner"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            }
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderColor: "#FFFFFF",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "10px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Create pet owner profile
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/create-caregiver-profile")}
            startIcon={
              <img
                src={catImage}
                alt="Cat Caregiver"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            }
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderColor: "#FFFFFF",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "10px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Create caregiver profile
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default WelcomePage;
