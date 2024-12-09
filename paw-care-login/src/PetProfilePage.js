import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Avatar,
  MenuItem,
  IconButton,
  Menu,
  CircularProgress,
} from '@mui/material';
import {
  Notifications,
  Message,
  CalendarToday,
  Settings,
} from '@mui/icons-material';
import axios from 'axios';
import logo from './assets/logo-no-background.png';

function PetProfilePage() {
  const { petId } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/pets/${petId}`
        );
        setPet(response.data);
      } catch (err) {
        console.error('Error fetching pet profile:', err);
        setError('Failed to load pet profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleOpenCalendar = () => {
    navigate('/calendar');
  };

  if (loading) {
    return (
      <Box
        style={{
          backgroundColor: '#f3f3f3',
          width: '100vw',
          minHeight: '100vh',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        style={{
          backgroundColor: '#f3f3f3',
          width: '100vw',
          minHeight: '100vh',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color='error'>{error}</Typography>
      </Box>
    );
  }

  if (!pet) {
    return (
      <Box
        style={{
          backgroundColor: '#f3f3f3',
          width: '100vw',
          minHeight: '100vh',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>No pet found.</Typography>
      </Box>
    );
  }
  const {
    name,
    breed,
    type,
    age,
    gender,
    attention,
    characteristic,
    image,
    owner,
  } = pet;

  return (
    <Box
      style={{
        backgroundColor: '#f3f3f3',
        width: '100vw',
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <Box display='flex' justifyContent='center' mb={4}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          padding='20px 25px'
          marginTop='40px'
          style={{
            width: '80%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
          }}
        >
          <img
            src={logo}
            alt='Paw Care Logo'
            style={{ width: '120px', height: '50px' }}
          />
          <Box display='flex' alignItems='center' gap='10px'>
            <IconButton onClick={() => navigate('/notifications')}>
              <Notifications />
            </IconButton>
            <IconButton onClick={() => navigate('/messages')}>
              <Message />
            </IconButton>
            <IconButton onClick={handleOpenCalendar}>
              <CalendarToday />
            </IconButton>
            <IconButton onClick={handleMenuClick}>
              <Settings />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate('/pet-owner-dashboard');
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: '#EACFFE',
                  },
                }}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    backgroundColor: '#EACFFE',
                  },
                }}
                onClick={() => {
                  handleMenuClose();
                  navigate('/calendar');
                }}
              >
                Calendar
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    backgroundColor: '#EACFFE',
                  },
                }}
                onClick={() => {
                  handleMenuClose();
                  navigate('/reviews');
                }}
              >
                Reviews
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    backgroundColor: '#EACFFE',
                  },
                }}
                onClick={() => {
                  handleMenuClose();
                  navigate('/');
                }}
              >
                Log out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Box display='flex' justifyContent='center' padding='20px'>
        <Box
          width='80%'
          maxWidth='800px'
          bgcolor='#FFFFFF'
          padding='30px'
          borderRadius='10px'
          boxShadow='0px 4px 12px rgba(0, 0, 0, 0.1)'
        >
          <Box display='flex' alignItems='center' gap='20px'>
            {image ? (
              <Avatar alt={name} src={image} sx={{ width: 120, height: 120 }} />
            ) : (
              <Avatar sx={{ width: 120, height: 120 }}>{name.charAt(0)}</Avatar>
            )}
            <Box>
              <Typography variant='h5' fontWeight='bold'>
                {name}
              </Typography>
              <Typography variant='subtitle1'>{breed}</Typography>
              <Typography variant='body2'>Type: {type}</Typography>
              <Typography variant='body2'>Gender: {gender}</Typography>
              <Typography variant='body2'>Age: {age}</Typography>
            </Box>
          </Box>
          <Box marginTop='20px'>
            {owner && (
              <Typography variant='h6'>
                Owner: {owner.name || 'No owner name available'}
              </Typography>
            )}
            {/* Add other owner details if available, like location */}
          </Box>
          <Box marginTop='20px'>
            {characteristic && (
              <Typography variant='body1'>{characteristic}</Typography>
            )}
            {attention && (
              <Typography variant='subtitle2' color='primary' marginTop='10px'>
                Special Needs: {attention}
              </Typography>
            )}
          </Box>
          <Box marginTop='30px' display='flex' gap='20px'>
            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate(`/create-pet-profile`)}
            >
              Edit
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => navigate('/pet-owner-dashboard')}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PetProfilePage;
