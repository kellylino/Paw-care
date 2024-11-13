import React from 'react';
import { Box, Button, Typography, Container, Card, CardContent, Avatar, TextField, MenuItem, IconButton } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import petImage from './assets/pet-image.png'; // Replace with actual image path
import logo from './assets/logo-no-background.png';

function PetOwnerDashboard() {
  const pets = [
    { name: 'Snoopy', age: '1 year', gender: 'Male' },
    { name: 'Snoopy', age: '1 year', gender: 'Male' },
    { name: 'Snoopy', age: '1 year', gender: 'Male' },
  ];

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
            <IconButton><Avatar alt="Notifications">🔔</Avatar></IconButton>
            <IconButton><Avatar alt="Messages">💬</Avatar></IconButton>
            <Button>user_name</Button>
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
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>View profile</Button>
                </CardContent>
              </Card>
            ))}
          </Box>
          <IconButton><ArrowForwardIos /></IconButton>
        </Box>
      </Container>

      {/* Upcoming Bookings and Recent Reviews */}
      <Container maxWidth="lg">
        <Box display="flex" gap="40px" mb={4}>
          {/* Upcoming Bookings */}
          <Box flex="1">
            <Typography variant="h6" gutterBottom>Upcoming bookings</Typography>
            <Card style={{ padding: '20px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <Box display="flex" alignItems="center" gap="15px">
                <img src={petImage} alt="Pet" style={{ width: '80px', height: '80px', borderRadius: '10px' }} />
                <Box>
                  <Typography variant="body1">Pet: Lucky</Typography>
                  <Typography variant="body2">Owner: John Smith</Typography>
                  <Typography variant="body2">Date: 28.12.2024</Typography>
                </Box>
              </Box>
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>Open calendar</Button>
            </Card>
          </Box>

          {/* Recent Reviews */}
          <Box flex="1">
            <Typography variant="h6" gutterBottom>Recent reviews</Typography>
            <Card style={{ padding: '20px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="body2" gutterBottom>"Lorem ipsum dolor sit amet, consectetur adipiscing elit..."</Typography>
              <Typography variant="body2">Owner: Kelly White</Typography>
              <Typography variant="body2">Pet: Kai</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>View all reviews</Button>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PetOwnerDashboard;
