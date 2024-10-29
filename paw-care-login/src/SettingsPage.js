import React, { useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";

function SettingsPage({ onConfirmColorChange, currentColor }) {
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleConfirm = () => {
    onConfirmColorChange(selectedColor);
  };

  const handleCancel = () => {
    setSelectedColor(currentColor);
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box marginTop={4}>
        <Typography variant="body1">
          Customize the appearance of your application.
        </Typography>
        <Box display="flex" flexDirection="column" gap="20px" marginTop={4}>
          <Typography variant="h6">Colors</Typography>
          <Box display="flex" gap="20px">
            {/* color */}
            <Box
              onClick={() => handleColorSelect("#FFE39F")}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#FFE39F",
                cursor: "pointer",
                border: selectedColor === "#FFE39F" ? "3px solid black" : "none",
              }}
            />
            <Box
              onClick={() => handleColorSelect("#294D66")}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#294D66",
                cursor: "pointer",
                border: selectedColor === "#294D66" ? "3px solid black" : "none",
              }}
            />
            <Box
              onClick={() => handleColorSelect("#B9DAD6")}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#B9DAD6",
                cursor: "pointer",
                border: selectedColor === "#B9DAD6" ? "3px solid black" : "none",
              }}
            />
            <Box
              onClick={() => handleColorSelect("#6FBF73")}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#6FBF73",
                cursor: "pointer",
                border: selectedColor === "#6FBF73" ? "3px solid black" : "none",
              }}
            />
          </Box>

          <Typography variant="h6" marginTop={4}>Fonts</Typography>
          <TextField fullWidth label="Select Font" variant="outlined" placeholder="e.g., Arial, Roboto" />

          <Typography variant="h6" marginTop={4}>Sections</Typography>
          <Box display="flex" flexDirection="column" gap="10px">
            <Box style={{ backgroundColor: "#FFE39F", padding: "10px" }}>Hero</Box>
            <Typography>services search & listing</Typography>
            <Typography>about us</Typography>
            <Typography>products</Typography>
            <Typography>Testimonials</Typography>
            <Typography>footer</Typography>
          </Box>

          <Typography variant="h6" marginTop={4}></Typography>
          <Box display="flex" gap="20px">
          </Box>

          <Box display="flex" gap="20px" marginTop={4}>
            {/* confirm button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            {/* cancel button */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SettingsPage;