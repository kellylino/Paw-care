import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PetOwnerForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
      setErrorMessage('User not logged in.');
      return;
    }

    // Ensure fields are filled before attempting to save
    if (!name.trim()) {
      setErrorMessage('Owner name is required.');
      return;
    }

    if (!address.trim()) {
      setErrorMessage('Address is required.');
      return;
    }

    try {
      // Save owner profile in the database and update user role
      console.log('Saving owner profile...');
      const response = await axios.post(
        'http://localhost:4000/api/owners',
        { name: name.trim(), address: address.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Owner profile response:', response);

      // If the request is successful, open the dialog
      setOpen(true);
    } catch (error) {
      console.error('Save profile error:', error);

      if (error.response && error.response.data) {
        console.log('Error response data:', error.response.data);
        setErrorMessage(
          `Failed to create profile: ${
            error.response.data.message ||
            'No specific error message from server.'
          }`
        );
      } else {
        setErrorMessage('Failed to create profile. Please try again.');
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/pet-owner-dashboard');
  };

  const handleCreatePetProfile = () => {
    setOpen(false);
    navigate('/create-pet-profile');
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      width='100vw'
      sx={{
        background: 'linear-gradient(to right, #EEEEEE 50%, #e8daff 50%)',
      }}
      padding={3}
    >
      <Box
        display='flex'
        maxWidth='750px'
        backgroundColor='#FFFFFF'
        margin='0px 10px'
        borderRadius='10px'
        overflow='hidden'
        boxShadow='0px 4px 12px rgba(0, 0, 0, 0.1)'
      >
        <Box
          width='45%'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          gap='0.7rem'
          padding='30px 10px 30px 35px'
        >
          <Typography
            variant='h6'
            style={{
              fontFamily: 'RobotoSlab, serif',
              fontWeight: 'bold',
              fontSize: '1.3rem',
            }}
            gutterBottom
          >
            Just a few words about you...
          </Typography>
          <Typography
            variant='body2'
            style={{
              fontFamily: 'RobotoSlab, serif',
              fontSize: '1.1rem',
            }}
          >
            Don't worry, we really care more about your pet!
          </Typography>
        </Box>

        {/* Form Section */}
        <Box width='50%' padding={5}>
          <Typography
            variant='h5'
            gutterBottom
            style={{
              fontWeight: 'bold',
              fontFamily: 'RobotoSlab, serif',
              fontSize: '1.4rem',
            }}
          >
            Create a profile
          </Typography>
          <TextField
            fullWidth
            label='Owner Full Name'
            variant='outlined'
            margin='normal'
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
          <TextField
            fullWidth
            label='Address'
            variant='outlined'
            margin='normal'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'Roboto Slab, serif',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Roboto Slab, serif',
              },
            }}
          />
          <Box marginTop={4} textAlign='center'>
            <Button
              variant='contained'
              fullWidth
              sx={{
                backgroundColor: '#6C63FF',
                color: '#FFFFFF',
                textTransform: 'none',
                fontSize: '1rem',
                fontFamily: 'Roboto Slab, serif',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                '&:hover': {
                  backgroundColor: '#EACFFE',
                  color: '#000000',
                },
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            variant='h6'
            style={{
              fontWeight: 'bold',
              fontSize: '1.3rem',
              fontFamily: 'Roboto Slab, serif',
            }}
          >
            Thanks for that!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant='body1'
            style={{ fontFamily: 'Roboto Slab, serif', fontSize: '1.2rem' }}
          >
            Would you like to create a profile for your pet now?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCreatePetProfile}
            sx={{
              color: '#6C63FF',
              fontWeight: 'bold',
              fontFamily: 'Roboto Slab, serif',
              backgroundColor: '#FFFFFF',
              '&:hover': {
                color: '#8F0CF0',
              },
            }}
          >
            Yes, sure
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: '#BDBDBD',
              fontWeight: 'bold',
              fontFamily: 'Roboto Slab, serif',
              marginRight: '10px',
              backgroundColor: '#FFFFFF',
              '&:hover': {
                color: '#8F0CF0',
              },
            }}
          >
            No, I am done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PetOwnerForm;
