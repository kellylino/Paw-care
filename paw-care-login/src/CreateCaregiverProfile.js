import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

function CreateCaregiverProfile() {
  const [petImage, setPetImage] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [preferredPets, setPreferredPets] = useState('');

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
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      width='100vw'
      backgroundColor='#EEEEEE'
      sx={{
        background: 'linear-gradient(to right, #EEEEEE 50%, #F8F9CC 50%)',
      }}
    >
      <Box
        width='700px'
        backgroundColor='#FFFFFF'
        padding='30px'
        borderRadius='10px'
        boxShadow='0px 4px 12px rgba(0, 0, 0, 0.1)'
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
          mb={0.2}
        >
          {/* Left Side */}
          <Box width='55%'>
            <Typography
              variant='h5'
              style={{
                fontWeight: 'bold',
                fontFamily: 'Roboto Slab, serif',
                fontSize: '1.4rem',
                marginBottom: '5px',
              }}
            >
              Create a profile
            </Typography>
            <Typography
              variant='body2'
              style={{
                fontFamily: 'Roboto Slab, serif',
                fontSize: '1.2rem',
                color: '#969597',
                marginBottom: '55px',
              }}
            >
              Please complete all fields
            </Typography>
            <TextField
              fullWidth
              label='Full Name'
              variant='outlined'
              margin='dense'
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Roboto Slab, serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Roboto Slab, serif',
                },
              }}
            />
          </Box>

          {/* Right Side: Image Upload */}
          <Box
            width='35%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            sx={{
              marginTop: '-25px',
            }}
          >
            {petImage ? (
              <img
                src={petImage}
                alt='Uploaded'
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  marginBottom: '10px',
                }}
              />
            ) : (
              <Box
                width='120px'
                height='120px'
                borderRadius='50%'
                backgroundColor='#f0f0f0'
                display='flex'
                alignItems='center'
                justifyContent='center'
                marginBottom='10px'
                marginTop={4}
              >
                <Typography
                  variant='body2'
                  color='textSecondary'
                  style={{
                    fontFamily: 'RobotoSlab, serif',
                    fontSize: '1rem',
                    color: '#969597',
                  }}
                >
                  No Image
                </Typography>
              </Box>
            )}
            <Button
              variant='contained'
              component='label'
              style={{
                fontFamily: 'RobotoSlab, serif',
                fontSize: '0.9rem',
                textTransform: 'none',
                marginBottom: '30px',
                backgroundColor: '#EACFFE',
                cursor: 'pointer',
                color: '#000000',
              }}
            >
              Upload image
              <input type='file' hidden onChange={handleImageUpload} />
            </Button>
          </Box>
        </Box>

        {/* Row 2: Address and Bio */}
        <Box display='flex' justifyContent='space-between'>
          <Box width='55%'>
            <TextField
              fullWidth
              label='Address'
              variant='outlined'
              margin='dense'
              sx={{
                mb: 3,
                '& .MuiInputBase-input': {
                  fontFamily: 'Roboto Slab, serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Roboto Slab, serif',
                },
              }}
            />
            <TextField
              fullWidth
              label='Bio'
              variant='outlined'
              margin='dense'
              multiline
              rows={4}
              placeholder="Share a little about your personality! What makes you a pet's best friend?"
              sx={{
                mb: 2,
                '& .MuiInputBase-input': {
                  fontFamily: 'Roboto Slab, serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Roboto Slab, serif',
                },
              }}
            />
          </Box>

          {/* Right Side: Experience Level and Preferred Pets */}
          <Box
            width='35%'
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
          >
            <FormControl
              fullWidth
              variant='outlined'
              margin='dense'
              sx={{
                mb: 2,
                '& .MuiInputBase-input': {
                  fontFamily: 'Roboto Slab, serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Roboto Slab, serif',
                },
              }}
            >
              <InputLabel>Experience level</InputLabel>
              <Select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                label='Experience level'
              >
                <MenuItem
                  value='entry'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Entry (less than 1 year)
                </MenuItem>
                <MenuItem
                  value='junior'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Junior (1-3 years)
                </MenuItem>
                <MenuItem
                  value='mid-level'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Mid-Level (3-5 years)
                </MenuItem>
                <MenuItem
                  value='senior'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Senior (5-10 years)
                </MenuItem>
                <MenuItem
                  value='expert'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Expert (10+ years)
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              variant='outlined'
              margin='dense'
              sx={{
                mb: 3,
                '& .MuiInputBase-input': {
                  fontFamily: 'Roboto Slab, serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Roboto Slab, serif',
                },
              }}
            >
              <InputLabel>Preferred pets</InputLabel>
              <Select
                value={preferredPets}
                onChange={(e) => setPreferredPets(e.target.value)}
                label='Preferred pets'
              >
                <MenuItem
                  value='dog'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Dog
                </MenuItem>
                <MenuItem
                  value='cat'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Cat
                </MenuItem>
                <MenuItem
                  value='bird'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Bird
                </MenuItem>
                <MenuItem
                  value='rabbit'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Rabbit
                </MenuItem>
                <MenuItem
                  value='small-mammals'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Small mammals (e.g., hamsters, guinea pigs)
                </MenuItem>
                <MenuItem
                  value='exotic-pet'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  Exotic pet
                </MenuItem>
                <MenuItem
                  value='no-preference'
                  sx={{
                    fontFamily: 'Roboto Slab, serif',
                  }}
                >
                  No preference
                </MenuItem>
              </Select>
            </FormControl>
            <Box textAlign='center'>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#6C63FF',
                  color: '#FFFFFF',
                  padding: '10px 30px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  width: '100%',
                  textTransform: 'none',
                  transition: 'background-color 0.4s ease, color 0.4s ease',
                  '&:hover': {
                    backgroundColor: '#EACFFE',
                    color: '#000000',
                  },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Save Button */}
      </Box>
    </Box>
  );
}

export default CreateCaregiverProfile;
