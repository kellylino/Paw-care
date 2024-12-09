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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateCaregiverProfile() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [petsType, setPetsType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const maxFileSizeMB = 2; // Set max file size limit

    if (file && file.size > maxFileSizeMB * 1024 * 1024) {
      setErrorMessage(`File size exceeds ${maxFileSizeMB}MB. Please upload a smaller image.`);
      return;
    }

    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5, // Compress further if needed
          maxWidthOrHeight: 300, // Reduce resolution
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
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

    try {
      const response = await axios.post(
        'http://localhost:4000/api/givers',
        {
          name,
          address,
          description,
          experience,
          pets_type: petsType,
          image: profileImage,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      navigate('/caregiver_dashboard');
    } catch (error) {
      console.error('Save caregiver profile error:', error);
      if (error.response) {
        setErrorMessage(
          `Failed to create caregiver profile: ${error.response.data.message}`
        );
      } else {
        setErrorMessage('Failed to create caregiver profile. Please try again.');
      }
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
    >
      <Box
        width='700px'
        backgroundColor='#FFFFFF'
        padding='30px'
        borderRadius='10px'
        boxShadow='0px 4px 12px rgba(0, 0, 0, 0.1)'
      >
        <Typography
          variant='h5'
          fontWeight='bold'
          fontFamily='Roboto Slab, serif'
          fontSize='1.4rem'
          marginBottom='5px'
        >
          Create a caregiver profile
        </Typography>
        <Typography
          variant='body2'
          fontFamily='Roboto Slab, serif'
          fontSize='1.2rem'
          color='#969597'
          marginBottom='20px'
        >
          Please complete all fields
        </Typography>

        {/* Profile Image Upload */}
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          marginBottom='30px'
        >
          {profileImage ? (
            <img
              src={profileImage}
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
            >
              <Typography
                variant='body2'
                fontFamily='Roboto Slab, serif'
                fontSize='1rem'
                color='#969597'
              >
                No Image
              </Typography>
            </Box>
          )}
          <Button
            variant='contained'
            component='label'
            fontFamily='Roboto Slab, serif'
            fontSize='0.9rem'
            textTransform='none'
            backgroundColor='#EACFFE'
            color='#000000'
            cursor='pointer'
          >
            Upload Profile Image
            <input type='file' hidden onChange={handleImageUpload} />
          </Button>
        </Box>

        {/* Form Fields */}
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
            marginBottom: '20px',
          }}
        />

        <TextField
          fullWidth
          label='Address'
          variant='outlined'
          margin='dense'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: 'Roboto Slab, serif',
            },
            '& .MuiInputLabel-root': {
              fontFamily: 'Roboto Slab, serif',
            },
            marginBottom: '20px',
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
          placeholder='Tell us more about yourself as a caregiver!'
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: 'Roboto Slab, serif',
            },
            '& .MuiInputLabel-root': {
              fontFamily: 'Roboto Slab, serif',
            },
            marginBottom: '20px',
          }}
        />

        <FormControl fullWidth margin='dense' sx={{ marginBottom: '20px' }}>
          <InputLabel>Experience Level</InputLabel>
          <Select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            label='Experience Level'
            sx={{
              fontFamily: 'Roboto Slab, serif',
            }}
          >
            {[
              'Entry (less than 1 year)',
              'Junior (1-3 years)',
              'Mid-Level (3-5 years)',
              'Senior (5-10 years)',
              'Expert (10+ years)',
            ].map((level) => (
              <MenuItem
                key={level}
                value={level}
                sx={{ fontFamily: 'Roboto Slab, serif' }}
              >
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='dense' sx={{ marginBottom: '20px' }}>
          <InputLabel>Preferred Pets</InputLabel>
          <Select
            value={petsType}
            onChange={(e) => setPetsType(e.target.value)}
            label='Preferred Pets'
            sx={{
              fontFamily: 'Roboto Slab, serif',
            }}
          >
            {[
              'Dog',
              'Cat',
              'Bird',
              'Rabbit',
              'Small mammals',
              'Exotic pets',
              'No preference',
            ].map((type) => (
              <MenuItem
                key={type}
                value={type}
                sx={{ fontFamily: 'Roboto Slab, serif' }}
              >
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant='contained'
          fullWidth
          onClick={handleSaveProfile}
          sx={{
            backgroundColor: '#6C63FF',
            color: '#FFFFFF',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
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
