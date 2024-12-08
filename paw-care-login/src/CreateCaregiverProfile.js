import React, { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateCaregiverProfile() {
  const navigate = useNavigate();
  const [petImage, setPetImage] = useState(null);
  const [experience, setExperience] = useState('');
  const [petsType, setPetsType] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPetImage(e.target.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Image compression failed:', error);
      }
    }
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
      setErrorMessage('User not logged in.');
      return;
    }

    // Check if all required fields are filled
    if (!name.trim() || !address.trim() || !description.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      // Create a new FormData instance
      const formData = new FormData();

      // Append the form data with proper keys and values
      formData.append('name', name);
      formData.append('address', address);
      formData.append('description', description);
      formData.append('experience', experience);
      if (petsType && petsType.length > 0) {
        petsType.forEach((pet) => formData.append('pets_type', pet));
      }
      formData.append('user', userId); // Add userId to formData

      // Check and append pet image if provided
      if (petImage) {
        const byteString = atob(petImage.split(',')[1]);
        const mimeString = petImage.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        //formData.append('image', blob, 'petImage.jpg');
      }

      // Log all form data to verify its contents before sending
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      console.log('Sending formData to server...');

      const response = await axios.post(
        'http://localhost:4000/api/givers',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        console.log('Profile created successfully!');
        console.log('Navigating to caregiver_dashboard...');
        navigate('/caregiver_dashboard');
      } else {
        setErrorMessage(
          'Unexpected response status, could not create profile.'
        );
      }
    } catch (error) {
      console.error('Save profile error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        setErrorMessage(
          `Failed to create profile: ${error.response.data.message}`
        );
      } else {
        setErrorMessage('Failed to create profile. Please try again.');
      }
    }
  };

  const handlePetsTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setPetsType(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      width='100vw'
      backgroundColor='#EEEEEE'
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                    fontFamily: 'Roboto Slab, serif',
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
                fontFamily: 'Roboto Slab, serif',
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

        {/* Rest of the Form */}
        <Box display='flex' justifyContent='space-between'>
          <Box width='55%'>
            <TextField
              fullWidth
              label='Address'
              variant='outlined'
              margin='dense'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              label='Description'
              variant='outlined'
              margin='dense'
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                label='Experience level'
              >
                <MenuItem
                  value='entry'
                  sx={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  Entry (less than 1 year)
                </MenuItem>
                <MenuItem
                  value='junior'
                  sx={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  Junior (1-3 years)
                </MenuItem>
                <MenuItem
                  value='mid-level'
                  sx={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  Mid-Level (3-5 years)
                </MenuItem>
                <MenuItem
                  value='senior'
                  sx={{ fontFamily: 'Roboto Slab, serif' }}
                >
                  Senior (5-10 years)
                </MenuItem>
                <MenuItem
                  value='expert'
                  sx={{ fontFamily: 'Roboto Slab, serif' }}
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
                multiple
                value={petsType}
                onChange={handlePetsTypeChange}
                renderValue={(selected) => selected.join(', ')}
                label='Preferred pets'
              >
                {[
                  'Dog',
                  'Cat',
                  'Bird',
                  'Rabbit',
                  'Small mammals',
                  'Exotic pet',
                  'No preference',
                ].map((pet) => (
                  <MenuItem
                    key={pet}
                    value={pet}
                    sx={{ fontFamily: 'Roboto Slab, serif' }}
                  >
                    <Checkbox checked={petsType.indexOf(pet) > -1} />
                    <ListItemText primary={pet} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box textAlign='center'>
              <Button
                variant='contained'
                onClick={handleSaveProfile}
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

        {errorMessage && (
          <Typography color='error' variant='body2' sx={{ marginTop: '20px' }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default CreateCaregiverProfile;
