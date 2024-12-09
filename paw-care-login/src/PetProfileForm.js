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

function PetProfileForm() {
  const navigate = useNavigate();
  const [petImage, setPetImage] = useState(null);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [petType, setPetType] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [personality, setPersonality] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5, 
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

    try {
      const response = await axios.post(
        'http://localhost:4000/api/pets',
        {
          name,
          age,
          breed,
          petType,
          gender,
          specialNeeds,
          personality,
          owner: userId,
          image: petImage, // Add this field
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      navigate('/pet-owner-dashboard');
    } catch (error) {
      console.error('Save pet profile error:', error);
      if (error.response) {
        setErrorMessage(
          `Failed to create pet profile: ${error.response.data.message}`
        );
      } else {
        setErrorMessage('Failed to create pet profile. Please try again.');
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
          Create a pet profile
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

        {/* Pet Image Upload */}
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          marginBottom='30px'
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
            Upload Pet Image
            <input type='file' hidden onChange={handleImageUpload} />
          </Button>
        </Box>

        {/* Form Fields */}
        <TextField
          fullWidth
          label='Pet Name'
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
          label='Pet Breed'
          variant='outlined'
          margin='dense'
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
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
          <InputLabel>Pet Type</InputLabel>
          <Select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            label='Pet Type'
            sx={{
              fontFamily: 'Roboto Slab, serif',
            }}
          >
            {[
              'Dog',
              'Cat',
              'Bird',
              'Rabbit',
              'Small mammals (e.g., hamsters)',
              'Exotic pet',
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

        <FormControl fullWidth margin='dense' sx={{ marginBottom: '20px' }}>
          <InputLabel>Pet Age</InputLabel>
          <Select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            label='Pet Age'
            sx={{
              fontFamily: 'Roboto Slab, serif',
            }}
          >
            {[
              'Baby (0-1 year)',
              'Young (1-3 years)',
              'Adult (3-8 years)',
              'Mature (8-10 years)',
              'Senior (10+ years)',
            ].map((ageRange) => (
              <MenuItem
                key={ageRange}
                value={ageRange}
                sx={{ fontFamily: 'Roboto Slab, serif' }}
              >
                {ageRange}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='dense' sx={{ marginBottom: '20px' }}>
          <InputLabel>Pet Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label='Pet Gender'
            sx={{
              fontFamily: 'Roboto Slab, serif',
            }}
          >
            {['Male', 'Female', 'Prefer not to say'].map((genderOption) => (
              <MenuItem
                key={genderOption}
                value={genderOption}
                sx={{ fontFamily: 'Roboto Slab, serif' }}
              >
                {genderOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='dense' sx={{ marginBottom: '20px' }}>
          <InputLabel>Special Needs</InputLabel>
          <Select
            value={specialNeeds}
            onChange={(e) => setSpecialNeeds(e.target.value)}
            label='Special Needs'
            sx={{
              fontFamily: 'Roboto Slab, serif',
            }}
          >
            {[
              'None',
              'Medical condition (e.g., diabetes, epilepsy)',
              'Mobility issues',
              'Hearing or vision impairment',
              'Behavioral issues (e.g., anxiety, aggression)',
              'Dietary restrictions',
              'Other (please describe in the personality field)',
            ].map((need) => (
              <MenuItem
                key={need}
                value={need}
                sx={{ fontFamily: 'Roboto Slab, serif' }}
              >
                {need}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label='Pet Personality'
          variant='outlined'
          margin='dense'
          multiline
          rows={4}
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          placeholder='Tell us more about your paw baby. Is it bold? What are its favorite toys? Any quirky habits?'
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

export default PetProfileForm;
