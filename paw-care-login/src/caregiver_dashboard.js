import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Avatar,
  Modal,
} from '@mui/material';
import {
  Notifications,
  Message,
  CalendarToday,
  Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaregiverDashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]); // Pets data from the server
  const [location, setLocation] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageOpen, setMessageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [message, setMessage] = useState('');

  const hardCodedUpcomingBookings = [
    {
      petImage: 'https://via.placeholder.com/80',
      petName: 'Lucky',
      ownerName: 'John Smith',
      date: '28.12.2024',
    },
    {
      petImage: 'https://via.placeholder.com/80',
      petName: 'Bella',
      ownerName: 'Jane Doe',
      date: '29.12.2024',
    },
  ];

  const hardCodedRecentReviews = [
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ownerName: 'Kelly White',
      petName: 'Kai',
    },
    {
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      ownerName: 'Sam Green',
      petName: 'Milo',
    },
  ];

  useEffect(() => {
    const fetchInitialPets = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pets');
        setPets(response.data || []);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setErrorMessage('Failed to fetch pets. Please try again later.');
      }
    };

    fetchInitialPets();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/pets', {
        params: {
          location,
          name: petName,
          type: petType,
        },
      });
      setPets(
        response.data.filter((pet) => {
          const matchesLocation = location
            ? pet.owner.address?.toLowerCase().includes(location.toLowerCase())
            : true;
          const matchesName = petName
            ? pet.name?.toLowerCase().includes(petName.toLowerCase())
            : true;
          const matchesType = petType
            ? pet.breed?.toLowerCase().includes(petType.toLowerCase())
            : true;
          return matchesLocation && matchesName && matchesType;
        }) || []
      );
    } catch (error) {
      console.error('Error fetching pets:', error);
      setErrorMessage('Failed to fetch pets. Please try again later.');
    }
  };

  const handleViewProfile = (pet) => {
    setSelectedPet(pet);
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
    setSelectedPet(null);
  };

  const handleSendMessage = (recipient) => {
    setSelectedRecipient(recipient);
    setMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setMessageOpen(false);
    setMessage('');
  };

  const handleSend = () => {
    console.log(`Message to ${selectedRecipient}: ${message}`);
    setMessageOpen(false);
    setMessage('');
  };

  const handleOpenCalendar = (booking) => {
    console.log(`Opening calendar for booking on ${booking.date}`);
    navigate('/calendar', { state: { booking } });
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
          <Typography variant="h6">Paw Care Dashboard</Typography>
          <Box display="flex" alignItems="center" gap="10px">
            <IconButton onClick={() => navigate('/notifications')}>
              <Notifications />
            </IconButton>
            <IconButton onClick={() => handleSendMessage('Admin')}>
              <Message />
            </IconButton>
            <IconButton onClick={() => navigate('/calendar')}>
              <CalendarToday />
            </IconButton>
            <IconButton onClick={() => navigate('/settings')}>
              <Settings />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Search Section */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Box
          display="flex"
          alignItems="center"
          bgcolor="#FFFFFF"
          borderRadius="10px"
          gap="20px"
          padding="20px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          style={{
            width: '81%',
          }}
        >
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Pet name"
            variant="outlined"
            fullWidth
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <TextField
            label="Pet type"
            variant="outlined"
            select
            fullWidth
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          >
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Bird">Bird</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
            <MenuItem value="Small mammals">Small mammals</MenuItem>
            <MenuItem value="Exotic pet">Exotic pet</MenuItem>
            <MenuItem value="No preference">No preference</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              backgroundColor: '#6C63FF',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#EACFFE',
                color: '#000000',
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Pets Section */}
      <Box display="flex" justifyContent="center" flexDirection="column" mb={4}>
        <Typography
          variant="h6"
          gutterBottom
          style={{ marginLeft: '6.5rem' }}
        >
          Pets in your area
        </Typography>
        <Box
          width="100vw"
          style={{ backgroundColor: '#D1D0D0', padding: '30px 20px' }}
        >
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap="20px"
          >
            {Array.isArray(pets) && pets.length > 0 ? (
              pets.map((pet, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '270px',
                    padding: '20px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt="Pet"
                    src={pet.image?.[0] || ''} // Use pet image if available
                    sx={{ width: 150, height: 150, marginBottom: '10px' }}
                  />
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2">Age: {pet.age}</Typography>
                  <Typography variant="body2">Breed: {pet.breed}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleViewProfile(pet)}
                    sx={{
                      marginTop: '10px',
                      backgroundColor: '#6C63FF',
                      '&:hover': {
                        backgroundColor: '#EACFFE',
                        color: '#000000',
                      },
                    }}
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleSendMessage(pet.name)}
                    sx={{
                      marginTop: '10px',
                      borderColor: '#6C63FF',
                      '&:hover': {
                        borderColor: '#EACFFE',
                        color: '#000000',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No pets found.</Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Upcoming Bookings Section */}
      <Box display="flex" justifyContent="space-between" px={5} mb={4}>
        <Box flex="1" mr={2}>
          <Typography variant="h6">Upcoming bookings</Typography>
          {hardCodedUpcomingBookings.map((booking, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              bgcolor="#FFFFFF"
              borderRadius="10px"
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              p={2}
              mb={2}
            >
              <Avatar
                src={booking.petImage || ''}
                alt={booking.petName}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box>
                <Typography variant="body1">Pet: {booking.petName}</Typography>
                <Typography variant="body2">Owner: {booking.ownerName}</Typography>
                <Typography variant="body2">Date: {booking.date}</Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  marginLeft: 'auto',
                  backgroundColor: '#6C63FF',
                  '&:hover': {
                    backgroundColor: '#EACFFE',
                    color: '#000000',
                  },
                }}
                onClick={() => handleOpenCalendar(booking)}
              >
                Open calendar
              </Button>
            </Box>
          ))}
        </Box>

        {/* Recent Reviews Section */}
        <Box flex="1" ml={2}>
          <Typography variant="h6">Recent reviews</Typography>
          {hardCodedRecentReviews.map((review, index) => (
            <Box
              key={index}
              bgcolor="#FFFFFF"
              borderRadius="10px"
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              p={2}
              mb={2}
            >
              <Typography variant="body2">"{review.text}"</Typography>
              <Typography variant="body2" mt={1}>
                Owner: {review.ownerName} - Pet: {review.petName}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginTop: '10px',
                  borderColor: '#6C63FF',
                  '&:hover': {
                    borderColor: '#EACFFE',
                    color: '#000000',
                  },
                }}
              >
                View all reviews
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Error Message */}
      {errorMessage && (
        <Typography
          color="error"
          textAlign="center"
          variant="body2"
          mt={2}
        >
          {errorMessage}
        </Typography>
      )}

      {/* Send Message Modal */}
      <Modal open={messageOpen} onClose={handleCloseMessage}>
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="400px"
          bgcolor="background.paper"
          p={4}
          boxShadow={24}
          borderRadius="10px"
        >
          <Typography variant="h6" mb={2}>
            Send Message to {selectedRecipient}
          </Typography>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Modal>

      {/* View Profile Modal */}
      <Modal open={profileOpen} onClose={handleCloseProfile}>
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="400px"
          bgcolor="background.paper"
          p={4}
          boxShadow={24}
          borderRadius="10px"
        >
          {selectedPet ? (
            <>
              <Typography variant="h6" mb={2}>{selectedPet.name}'s Profile</Typography>
              <Typography variant="body1">Age: {selectedPet.age || 'Unknown'}</Typography>
              <Typography variant="body1">Breed: {selectedPet.breed || 'Unknown'}</Typography>
              <Typography variant="body1">Description: {selectedPet.description || 'No description available'}</Typography>
            </>
          ) : (
            <Typography variant="body2">No profile data available.</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CaregiverDashboard;