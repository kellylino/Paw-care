import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function PetOwnerForm() {
  const [petImage, setPetImage] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [preferredPets, setPreferredPets] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPetImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box padding={4} display="flex" justifyContent="center" bgcolor="#f3f3f3" height="100vh">
      <Box
        width="700px"
        bgcolor="#FFFFFF"
        padding={4}
        borderRadius="10px"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      >
        <Typography variant="h5" gutterBottom>
          Create a profile
        </Typography>
        <Typography variant="body2" gutterBottom>
          Please complete all fields
        </Typography>

        <Grid container spacing={2}>
          {/* Full Name */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full Name" variant="outlined" />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
            {petImage ? (
              <img
                src={petImage}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "10px" }}
              />
            ) : (
              <Box
                width="100px"
                height="100px"
                borderRadius="50%"
                bgcolor="#f0f0f0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom="10px"
              >
                <Typography variant="body2" color="textSecondary">
                  No Image
                </Typography>
              </Box>
            )}
            <Button variant="contained" component="label">
              Upload Your Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Address" variant="outlined" />
          </Grid>

          {/* Bio */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              placeholder="Share a little about your personality! What makes you a pet's best friend?"
            />
          </Grid>

          {/* Experience Level */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Experience level</InputLabel>
              <Select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                label="Experience level"
              >
                <MenuItem value="entry">Entry (less than 1 year)</MenuItem>
                <MenuItem value="junior">Junior (1-3 years)</MenuItem>
                <MenuItem value="mid-level">Mid-Level (3-5 years)</MenuItem>
                <MenuItem value="senior">Senior (5-10 years)</MenuItem>
                <MenuItem value="expert">Expert (10+ years)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Preferred Pets */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Preferred pets</InputLabel>
              <Select
                value={preferredPets}
                onChange={(e) => setPreferredPets(e.target.value)}
                label="Preferred pets"
              >
                <MenuItem value="dog">Dog</MenuItem>
                <MenuItem value="cat">Cat</MenuItem>
                <MenuItem value="bird">Bird</MenuItem>
                <MenuItem value="rabbit">Rabbit</MenuItem>
                <MenuItem value="small-mammals">Small mammals (e.g., hamsters, guinea pigs)</MenuItem>
                <MenuItem value="exotic-pet">Exotic pet</MenuItem>
                <MenuItem value="no-preference">No preference</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box marginTop={4} textAlign="center">
          <Button
            variant="contained"
            style={{ backgroundColor: "#6C63FF", color: "#FFFFFF", padding: "10px 20px" }}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default PetOwnerForm;
