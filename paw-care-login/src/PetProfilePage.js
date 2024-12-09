import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Avatar,
  MenuItem,
  IconButton,
  Menu,
} from '@mui/material';
import {
  Notifications,
  Message,
  CalendarToday,
  Settings,
  Star,
} from '@mui/icons-material';
import logo from './assets/logo-no-background.png';
import { useNavigate } from 'react-router-dom';

function PetProfilePage() {
  const { id } = useParams();
  const [selectedPet, setSelectedPet] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const pet = {
    name: 'Danny',
    breed: 'Bernese Mountain Dog',
    gender: 'Male',
    age: '2 years',
    owner: 'Christian Brown',
    location: 'Tampere',
    rating: 5,
    description:
      'Danny is a friendly, playful dog who loves exploring new places and meeting new people...',
    specialNeeds: 'Dietary restrictions',
  };

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
                sx={{
                  fontFamily: fontStyle,
                  '&:hover': {
                    transition: 'background-color 0.3s ease',
                    backgroundColor: '#EACFFE',
                  },
                }}
                onClick={() => {
                  handleMenuClose();
                  navigate('/edit-profile');
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
          width='80%'
          maxWidth='800px'
          bgcolor='#FFFFFF'
          padding='30px'
          borderRadius='10px'
          boxShadow='0px 4px 12px rgba(0, 0, 0, 0.1)'
        >
          <Box display='flex' alignItems='center' gap='20px'>
            <Avatar
              alt={pet.name}
              src='/path/to/pet/image' // Use the actual image source here
              sx={{ width: 120, height: 120 }}
            />
            <Box>
              <Typography variant='h5' fontWeight='bold'>
                {pet.name}
              </Typography>
              <Typography variant='subtitle1'>{pet.breed}</Typography>
              <Typography variant='body2'>Gender: {pet.gender}</Typography>
              <Typography variant='body2'>Age: {pet.age}</Typography>
            </Box>
          </Box>
          <Box marginTop='20px'>
            <Typography variant='h6'>Owner: {pet.owner}</Typography>
            <Typography variant='body2'>Location: {pet.location}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {[...Array(pet.rating)].map((_, index) => (
                <span key={index}>&#9733;</span>
              ))}{' '}
              ({pet.rating} Reviews)
            </Typography>
          </Box>
          <Box marginTop='20px'>
            <Typography variant='body1'>{pet.description}</Typography>
            <Typography variant='subtitle2' color='primary' marginTop='10px'>
              Special Needs: {pet.specialNeeds}
            </Typography>
          </Box>
          <Box marginTop='30px' display='flex' gap='20px'>
            <Button
              variant='contained'
              color='primary'
              onClick={() => console.log('Edit pet profile')}
            >
              Edit
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => console.log('Cancel')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PetProfilePage;
