// src/PetProfileForm.js
import React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

function PetProfileForm() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f3f3f3" padding={4}>
      <Box display="flex" flexDirection="column" width="500px" bgcolor="#FFFFFF" borderRadius="10px" padding={4} boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)">
        <Typography variant="h5" gutterBottom>
          Create Your Pet's Profile
        </Typography>
        <TextField fullWidth label="Pet Name" variant="outlined" margin="normal" />
        <TextField fullWidth label="Age" variant="outlined" margin="normal" />
        <TextField fullWidth label="Breed" variant="outlined" margin="normal" />
        <Button variant="contained" style={{ backgroundColor: "#6C63FF", color: "#FFFFFF", marginTop: 16 }}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default PetProfileForm;
