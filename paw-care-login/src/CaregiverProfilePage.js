import React, { useState, useEffect } from 'react';

import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  Button,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Radio,
  Menu,
  MenuItem,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Notifications,
  Message,
  CalendarToday,
  Settings,
  Star,
} from '@mui/icons-material';
import logo from './assets/logo-no-background.png';
import petImage from './assets/advertisement-image.png';

function CaregiverProfilePage() {
  const { id } = useParams();
  const [selectedPet, setSelectedPet] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [giver, setGiver] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/givers/${id}`)
      .then((response) => {
        setGiver(response.data);
      })
      .catch((error) => {
        console.error('Error fetching giver:', error);
      });
  }, [id]);

  if (!giver) return <Typography>Loading...</Typography>;
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleOpenCalendar = () => {
    navigate('/calendar');
  };

  const handleSendMessage = () => {
    setMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setMessageOpen(false);
    setMessage('');
  };

  const handleSend = () => {
    console.log(`Message to ${selectedPet.name}: ${message}`);
    setMessageOpen(false);
    setMessage('');
  };
  const handleEditProfile = () => {
    setIsEditMode(true);
    handleMenuClose();
  };
  const handleCancelEdit = () => {
    setIsEditMode(false); // Exit edit mode
  };

  const fontStyle = { fontFamily: 'Roboto Slab, serif' };
  const menuItemStyle = {
    fontFamily: fontStyle.fontFamily,
    backgroundColor: '#FFFFFF',
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      transition: 'background-color 0.3s ease',
      backgroundColor: '#EACFFE',
    },
  };
  return (
    <Box
      sx={{
        backgroundColor: '#f3f3f3',
        width: '100vw',
        minHeight: '100vh',
        overflow: 'auto',
        background: 'linear-gradient(to left, #EACFFE 50%, #FFFFFF 50%)',
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
                sx={{
                  fontFamily: fontStyle,
                  '&:hover': {
                    transition: 'background-color 0.3s ease',
                    backgroundColor: '#EACFFE',
                  },
                }}
                onClick={() => {
                  handleEditProfile();
                  // navigate('/edit-profile');
                }}
              >
                Edit profile
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: fontStyle,
                  transition: 'background-color 0.3s ease',
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
                  fontFamily: fontStyle,
                  transition: 'background-color 0.3s ease',
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
                  fontFamily: fontStyle,
                  transition: 'background-color 0.3s ease',
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
          style={{
            width: '83%',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '100px',
          }}
        >
          <Box flex='50%'>
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt={giver.name}
                src={giver.image || ''}
                sx={{ width: 100, height: 100, border: '3px solid #6C63FF' }}
              />
              <Box>
                <Typography
                  variant='h5'
                  fontWeight='bold'
                  style={{
                    fontFamily: 'fontStyle',
                    textAlign: 'center',
                  }}
                >
                  {giver.name}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  style={{
                    fontFamily: 'fontStyle',
                    textAlign: 'center',
                  }}
                >
                  {giver.address}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  style={{
                    fontFamily: 'fontStyle',
                    textAlign: 'center',
                  }}
                >
                  {giver.experience}
                </Typography>
              </Box>
            </Box>

            {/* Actions */}
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px',
                flexDirection: 'column',
              }}
            >
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#6C63FF',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#4A42B0',
                  },
                }}
              >
                Send message
              </Button>
              <Button
                variant='outlined'
                sx={{
                  textTransform: 'none',
                  borderColor: '#6C63FF',
                  color: '#6C63FF',
                  '&:hover': {
                    backgroundColor: '#F3F0FF',
                  },
                }}
              >
                Check calendar
              </Button>
            </Box>
          </Box>
          {/* Bio */}
          <Box>
            <Box sx={{ marginTop: '20px' }}>
              <Typography variant='body1' paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse dictum quam vitae nisi cursus, vel vulputate purus
                hendrerit. Aenean vulputate elit.
              </Typography>
            </Box>

            {/* Preferred Pets */}
            <Box sx={{ marginTop: '20px' }}>
              <Typography variant='h6' fontWeight='bold'>
                {giver.pets_type}
              </Typography>
              {/* <RadioGroup row>
                <FormControlLabel value='Dog' control={<Radio />} label='Dog' />
                <FormControlLabel value='Cat' control={<Radio />} label='Cat' />
                <FormControlLabel
                  value='Bird'
                  control={<Radio />}
                  label='Bird'
                />
                <FormControlLabel
                  value='Rabbit'
                  control={<Radio />}
                  label='Rabbit'
                />
                <FormControlLabel
                  value='Exotic pet'
                  control={<Radio />}
                  label='Exotic pet'
                />
                <FormControlLabel
                  value='No preference'
                  control={<Radio />}
                  label='No preference'
                />
              </RadioGroup> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CaregiverProfilePage;
