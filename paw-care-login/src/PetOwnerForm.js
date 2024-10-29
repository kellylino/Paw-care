import React, { useState } from "react";
import { TextField, Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function PetOwnerForm() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f3f3f3"
      padding={4}
    >
      <Box
        display="flex"
        width="700px"
        bgcolor="#FFFFFF"
        borderRadius="10px"
        overflow="hidden"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      >
        {/* Left side text */}
        <Box
          bgcolor="#e8daff"
          width="40%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding={3}
        >
          <Typography variant="h6" style={{ fontWeight: "bold" }} gutterBottom>
            Just a few words about you...
          </Typography>
          <Typography variant="body2" style={{ fontWeight: "bold" }}>
            Don't worry, we really care more about your pet!
          </Typography>
        </Box>

        {/* Form Section */}
        <Box width="60%" padding={4}>
          <Typography variant="h5" gutterBottom>
            Create a profile
          </Typography>
          <TextField
            fullWidth
            label="Owner Full Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
          />
          <Box marginTop={4} textAlign="center">
            <Button variant="contained" style={{ backgroundColor: "#6C63FF", color: "#FFFFFF" }} onClick={handleSave}>
              SAVE
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Thanks for that!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            But now, let’s get to the real star —your pet! <br />
            Would you like to tell us about it?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#6C63FF", fontWeight: "bold" }}>
            Yes, sure
          </Button>
          <Button onClick={handleClose} style={{ color: "#BDBDBD", fontWeight: "bold" }}>
            No, I am done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PetOwnerForm;
