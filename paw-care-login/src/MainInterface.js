import React from 'react';
import { Box, Button, Typography, TextField, MenuItem, Avatar, IconButton, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import logo from './assets/logo-no-background.png';
import petImage from './assets/pet-image.png';
import appStoreLogo from './assets/app-store.png';
import googlePlayLogo from './assets/google-play.png';
import advertisementImage from './assets/advertisement-image.png';

function MainInterface() {
  const navigate = useNavigate();
  const caregivers = [
    { name: 'Kate Elliot', experience: 'Junior', rating: 5 },
    { name: 'John Doe', experience: 'Mid-Level', rating: 4.5 },
    { name: 'Emily Smith', experience: 'Senior', rating: 4.8 },
  ];

  const cardStyle = {
    width: '250px',
    padding: '20px',
    bgcolor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  return (
    <Box style={{ backgroundColor: '#f3f3f3', minHeight: '100vh', width: '100vw', padding: '20px' }}>
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
            <IconButton><Avatar alt="Notification">🔔</Avatar></IconButton>
            <IconButton><Avatar alt="Messages">💬</Avatar></IconButton>
            <Button onClick={() => navigate('/profile')}>user_name</Button>
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
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          padding="20px"
          width="100%"
          maxWidth="1200px"
        >
          <TextField label="Location" variant="outlined" fullWidth margin="normal" />
          <TextField label="Preferred pet" variant="outlined" select fullWidth margin="normal">
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Bird">Bird</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
            <MenuItem value="Exotic">Exotic pet</MenuItem>
            <MenuItem value="Any">No preference</MenuItem>
          </TextField>
          <TextField label="Experience level" variant="outlined" select fullWidth margin="normal">
            <MenuItem value="Entry">Entry (less than 1 year)</MenuItem>
            <MenuItem value="Junior">Junior (1-3 years)</MenuItem>
            <MenuItem value="Mid-Level">Mid-Level (3-5 years)</MenuItem>
            <MenuItem value="Senior">Senior (5-10 years)</MenuItem>
            <MenuItem value="Expert">Expert (10+ years)</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" style={{ marginLeft: '10px', height: '56px' }}>
            Search
          </Button>
        </Box>
      </Box>

      {/* Recommended Caregivers Carousel */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Box width="100%" maxWidth="1200px">
          <Typography variant="h6" gutterBottom>Recommended caregivers in your area</Typography>
          <Box display="flex" alignItems="center" gap="10px">
            <IconButton>
              <ArrowBackIos />
            </IconButton>
            <Box display="flex" overflow="auto" gap="20px" flex="1">
              {caregivers.map((caregiver, index) => (
                <Box key={index} sx={cardStyle}>
                  <Avatar alt={caregiver.name} src="" style={{ width: '80px', height: '80px', margin: 'auto' }} />
                  <Typography variant="body1" fontWeight="bold">{caregiver.name}</Typography>
                  <Typography variant="body2" color="textSecondary">Experience level: {caregiver.experience}</Typography>
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    View profile
                  </Button>
                </Box>
              ))}
            </Box>
            <IconButton>
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* My Pet Section aligned with Recommended Caregivers */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Box width="100%" maxWidth="1200px">
          <Typography variant="h6" gutterBottom>My Pet</Typography>
          <Box display="flex" justifyContent="center" gap="20px" flexWrap="wrap">
            <Box sx={cardStyle}>
              <img src={petImage} alt="Pet" style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }} />
              <Typography variant="body1" fontWeight="bold">Name: Danny</Typography>
              <Typography variant="body2">Gender: Male</Typography>
              <Typography variant="body2">Age: 3 years</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '15px' }}>
                View profile
              </Button>
            </Box>
            <Box sx={cardStyle} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Typography variant="body1" gutterBottom>Would you like to add more pets?</Typography>
              <Button variant="contained" color="primary" onClick={() => navigate('/create-pet-profile')}>
                Create profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Advertisement Section */}
      <Container maxWidth="lg" style={{ marginBottom: '40px', backgroundColor: '#e8e8e8', borderRadius: '10px', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            When you need to hire a trusted pet caregiver - PawCare will find them for you for free.
          </Typography>
          <Box display="flex" gap="10px" marginTop="10px">
            <img src={googlePlayLogo} alt="Google Play" style={{ width: '120px' }} />
            <img src={appStoreLogo} alt="App Store" style={{ width: '120px' }} />
          </Box>
        </Box>
        <Box>
          <img src={advertisementImage} alt="Advertisement" style={{ width: '200px', borderRadius: '10px' }} />
        </Box>
      </Container>

      {/* Footer */}
      <Box textAlign="center" padding="20px" color="#888888">
        <Typography variant="body2">&copy; 2024 PawCare</Typography>
        <Typography variant="body2">CONNECT WITH US</Typography>
      </Box>
    </Box>
  );
}

export default MainInterface;
