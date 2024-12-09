import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Notifications,
  Message,
  CalendarToday,
  Settings,
  Star,
} from '@mui/icons-material';
import axios from 'axios';
import logo from './assets/logo-no-background.png';

const PetProfilePage = () => {
  const { name } = useParams(); // Get pet name from URL
  const navigate = useNavigate();
  const [pet, setPet] = useState(null); // Store pet details
  const [menuAnchor, setMenuAnchor] = useState(null);

  // Fetch pet details
  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!name) {
        console.error('Pet name is undefined');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/pets');
        const matchedPet = response.data.find(
          (p) => p.name.toLowerCase() === name.toLowerCase()
        );
        if (matchedPet) {
          setPet(matchedPet);
        } else {
          console.error(`No pet found with name: ${name}`);
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetDetails();
  }, [name]);

  // Handle menu clicks
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleOpenCalendar = () => {
    navigate('/calendar');
  };

  if (!pet) {
    return (
      <Box
        style={{
          backgroundColor: '#f3f3f3',
          width: '100vw',
          minHeight: '100vh',
          overflow: 'auto',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" textAlign="center">
          {name ? 'Loading pet details...' : 'Invalid pet name. Please try again.'}
        </Typography>
      </Box>
    );
  }

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
      <Box display="flex" justifyContent="center" mb={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="20px 25px"
          marginTop="40px"
          style={{
            width: '80%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
          }}
        >
          <img
            src={logo}
            alt="Paw Care Logo"
            style={{ width: '120px', height: '50px' }}
          />
          <Box display="flex" alignItems="center" gap="10px">
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
                  navigate('/edit-profile');
                }}
              >
                Edit Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate('/calendar');
                }}
              >
                Calendar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate('/reviews');
                }}
              >
                Reviews
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate('/');
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* Pet Profile Details */}
      <Box display="flex" justifyContent="center" padding="20px">
        <Box
          width="80%"
          maxWidth="800px"
          bgcolor="#FFFFFF"
          padding="30px"
          borderRadius="10px"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        >
          <Box display="flex" alignItems="center" gap="20px">
            <Avatar
              alt={pet.name}
              src={pet.image?.[0] || ''}
              sx={{ width: 120, height: 120 }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {pet.name}
              </Typography>
              <Typography variant="subtitle1">{pet.breed}</Typography>
              <Typography variant="body2">Gender: {pet.gender}</Typography>
              <Typography variant="body2">Age: {pet.age}</Typography>
            </Box>
          </Box>
          <Box marginTop="20px">
            <Typography variant="h6">Owner: {pet.owner?.name}</Typography>
            <Typography variant="body2">Location: {pet.owner?.address}</Typography>
            <Typography variant="body2" color="textSecondary">
              {[...Array(pet.rating || 0)].map((_, index) => (
                <Star key={index} />
              ))}{' '}
              ({pet.rating || 0} Reviews)
            </Typography>
          </Box>
          <Box marginTop="20px">
            <Typography variant="body1">{pet.description}</Typography>
            {pet.specialNeeds && (
              <Typography variant="subtitle2" color="primary" marginTop="10px">
                Special Needs: {pet.specialNeeds}
              </Typography>
            )}
          </Box>
          <Box marginTop="30px" display="flex" gap="20px">
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log('Edit pet profile')}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PetProfilePage;
