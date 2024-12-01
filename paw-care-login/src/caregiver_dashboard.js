import React, { useState } from 'react';
import { Box, Button, Typography, Container, Card, CardContent, Avatar, TextField, MenuItem, IconButton, Modal, Menu } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos, Close, Notifications, Message, CalendarToday, Settings } from '@mui/icons-material';
import petImage from './assets/pet-image.png'; // Replace with actual image path
import logo from './assets/logo-no-background.png';
import { useNavigate } from 'react-router-dom';

const CaregiverDashboard = () => {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [petType, setPetType] = useState("");

  const pets = [
    { name: 'Snoopy', age: '1 year', gender: 'Male', experienceLevel: 'Junior', preferredPets: ['Dog', 'Cat', 'Bird'] },
    { name: 'Lucky', age: '2 years', gender: 'Male', experienceLevel: 'Senior', preferredPets: ['Dog'] },
  ];

  const handleProfileMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleOpenProfile = (pet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleMessengerClick = () => {
    navigate('/messages');
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

  const handleSearch = () => {
    // Handle search logic based on location, pet name, and pet type
  };

  const profileMenuId = "primary-profile-menu";
  const renderMenu = (
    <Menu
      anchorEl={menuAnchor}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(menuAnchor)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { handleMenuClose(); navigate('/edit-profile'); }}>Profile</MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard'); }}>Pet owner dashboard</MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>Log out</MenuItem>
    </Menu>
  );

  return (
    <Box style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="10px 20px"
          width="100%"
          maxWidth="1200px"
          bgcolor="#FFFFFF"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
          borderRadius="10px"
        >
          <img src={logo} alt="Paw Care Logo" style={{ width: '120px', height: '50px' }} />
          <Box display="flex" alignItems="center" gap="15px">
            <IconButton onClick={handleNotificationClick}><Notifications /></IconButton>
            <IconButton onClick={handleMessengerClick}><Message /></IconButton>
            <IconButton onClick={handleCalendarClick}><CalendarToday /></IconButton>
            <IconButton onClick={handleProfileMenuOpen}><Settings /></IconButton>
          </Box>
        </Box>
      </Box>

      {/* Search Section */}
      <Container maxWidth="lg">
        <Box
          display="flex"
          alignItems="center"
          bgcolor="#FFFFFF"
          borderRadius="10px"
          padding="20px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          mb={4}
        >
          <TextField label="Location" variant="outlined" fullWidth margin="normal" style={{ marginRight: '10px' }} />
          <TextField label="Pet name" variant="outlined" fullWidth margin="normal" style={{ marginRight: '10px' }} />
          <TextField label="Pet type" variant="outlined" select fullWidth margin="normal" style={{ width: '200px', marginRight: '10px' }} value={petType} onChange={(e) => setPetType(e.target.value)}>
            <MenuItem value="dog">Dog</MenuItem>
            <MenuItem value="cat">Cat</MenuItem>
            <MenuItem value="bird">Bird</MenuItem>
            <MenuItem value="rabbit">Rabbit</MenuItem>
            <MenuItem value="hamster">Small mammals (e.g., hamsters)</MenuItem>
            <MenuItem value="exotic">Exotic pet</MenuItem>
            <MenuItem value="none">No preference</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" style={{ height: '56px', marginLeft: '10px', backgroundColor: '#6C63FF' }} onClick={handleSearch}>Search</Button>
        </Box>
      </Container>

      {/* Pets in Your Area Section */}
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>Pets in your area looking for care</Typography>
        <Box display="flex" alignItems="center" gap="10px" mb={4}>
          <IconButton><ArrowBackIos /></IconButton>
          <Box display="flex" overflow="auto" gap="20px" flex="1">
            {pets.map((pet, index) => (
              <Card key={index} style={{ width: '200px', textAlign: 'center', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                <CardContent>
                  <img src={petImage} alt="Pet" style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }} />
                  <Typography variant="body1" fontWeight="bold">Name: {pet.name}</Typography>
                  <Typography variant="body2">Age: {pet.age}</Typography>
                  <Typography variant="body2">Gender: {pet.gender}</Typography>
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => handleOpenProfile(pet)}>View profile</Button>
                </CardContent>
              </Card>
            ))}
          </Box>
          <IconButton><ArrowForwardIos /></IconButton>
        </Box>
      </Container>

      {/* Upcoming Bookings and Recent Reviews Section */}
      <Container maxWidth="lg">
        <Box display="flex" gap="20px" mb={4}>
          {/* Upcoming Bookings */}
          <Box flex="1" bgcolor="#fff" padding="20px" borderRadius="10px" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
            <Typography variant="h6" gutterBottom>Upcoming bookings</Typography>
            <Box display="flex" overflow="auto">
              <Box
                minWidth="200px"
                marginRight="10px"
                padding="10px"
                border="1px solid #ccc"
                borderRadius="10px"
                textAlign="center"
                backgroundColor="#fff"
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              >
                <Typography variant="body1" fontWeight="bold">Pet: Lucky</Typography>
                <Typography variant="body2">Owner: John Smith</Typography>
                <Typography variant="body2">Date: 28.12.2024</Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleOpenCalendar}>
                  Open calendar
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Recent Reviews */}
          <Box flex="1" bgcolor="#fff" padding="20px" borderRadius="10px" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
            <Typography variant="h6" gutterBottom>Recent reviews</Typography>
            <Box display="flex" overflow="auto">
              <Box
                minWidth="200px"
                marginRight="10px"
                padding="10px"
                border="1px solid #ccc"
                borderRadius="10px"
                textAlign="center"
                backgroundColor="#fff"
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              >
                <Typography variant="body2" fontStyle="italic">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                </Typography>
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                  Owner: Kelly White
                </Typography>
                <Typography variant="body2">Pet: Kai</Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                  View all reviews
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Pet Profile Modal */}
      <Modal open={open} onClose={handleClose}>
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
          textAlign="center"
        >
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleClose}>
            <Close />
          </IconButton>
          {selectedPet && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar alt={selectedPet.name} src={petImage} style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>{selectedPet.name}</Typography>
              <Typography variant="body1">Age: {selectedPet.age}</Typography>
              <Typography variant="body1">Gender: {selectedPet.gender}</Typography>
              <Typography variant="body1">Experience level: {selectedPet.experienceLevel}</Typography>
              <Typography variant="body1" gutterBottom>Preferred pets: {selectedPet.preferredPets.join(', ')}</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSendMessage}>Send message</Button>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleOpenCalendar}>Check calendar</Button>
            </Box>
          )}
        </Box>
      </Modal>

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
          <Typography variant="h6" mb={2}>Send Message to {selectedPet?.name}</Typography>
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
          <Button variant="contained" color="primary" fullWidth onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CaregiverDashboard;
