import React, { useState } from 'react';
import { Box, Button, Typography, Container, Card, CardContent, Avatar, TextField, MenuItem, IconButton, Modal, Menu } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos, Close, Notifications, Message, CalendarToday, Settings } from '@mui/icons-material';
import petImage from './assets/pet-image.png'; // Replace with actual image path
import logo from './assets/logo-no-background.png';
import { useNavigate } from 'react-router-dom';

function PetOwnerDashboard() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const pets = [
    { name: 'Kate Elliott', age: '1 year', gender: 'Female', experienceLevel: 'Junior', preferredPets: ['Dog', 'Cat', 'Bird'] },
  ];

  const handleOpenProfile = (pet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <Box style={{ backgroundColor: '#f3f3f3', minHeight: '100vh', padding: '20px' }}>
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
            <IconButton onClick={() => navigate('/notifications')}><Notifications /></IconButton>
            <IconButton onClick={() => navigate('/messages')}><Message /></IconButton>
            <IconButton onClick={handleOpenCalendar}><CalendarToday /></IconButton>
            <IconButton onClick={handleMenuClick}><Settings /></IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigate('/edit-profile'); }}>Edit profile</MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate('/calendar'); }}>Calendar</MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate('/reviews'); }}>Reviews</MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>Log out</MenuItem>
            </Menu>
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
          <TextField label="Location" variant="outlined" fullWidth margin="normal" />
          <TextField label="Pet name" variant="outlined" fullWidth margin="normal" />
          <TextField label="Pet type" variant="outlined" select fullWidth margin="normal">
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Bird">Bird</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
            <MenuItem value="Exotic">Exotic pet</MenuItem>
            <MenuItem value="Any">No preference</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" style={{ height: '56px' }}>Search</Button>
        </Box>
      </Container>

      {/* Pets in Your Area Section */}
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>Pets in your area looking for care</Typography>
        <Box display="flex" alignItems="center" gap="10px" mb={4}>
          <IconButton><ArrowBackIos /></IconButton>
          <Box display="flex" overflow="auto" gap="20px" flex="1">
            {pets.map((pet, index) => (
              <Card key={index} style={{ width: '200px', textAlign: 'center', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <img src={petImage} alt="Pet" style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }} />
                  <Typography variant="body1">Name: {pet.name}</Typography>
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

      {/* Pet Profile Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bgcolor="background.paper"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleClose}>
            <Close />
          </IconButton>
          {selectedPet && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar alt={selectedPet.name} src={petImage} style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
              <Typography variant="h5" gutterBottom>{selectedPet.name}</Typography>
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
}

export default PetOwnerDashboard;
