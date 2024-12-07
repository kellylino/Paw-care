import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  TextField,
  MenuItem,
  IconButton,
  Modal,
  Menu,
} from '@mui/material';
import {
  ArrowForwardIos,
  ArrowBackIos,
  Close,
  Notifications,
  Message,
  CalendarToday,
  Settings,
  Star,
} from '@mui/icons-material';
import petImage from './assets/pet-image.png';
import logo from './assets/logo-no-background.png';
import { useNavigate } from 'react-router-dom';
import appStoreLogo from './assets/app-store.png';
import googlePlayLogo from './assets/google-play.png';
import advertisementImage from './assets/advertisement-image.png';

function PetOwnerDashboard() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
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
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

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
  const navigateToPetProfile = () => {
    navigate(`/pet-profile-page`);
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
                  navigate('/pet-profile-page');
                }}
              >
                Profile
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

      {/* Search Section */}
      <Box display='flex' justifyContent='center' mb={4}>
        <Box
          display='flex'
          alignItems='center'
          bgcolor='#FFFFFF'
          borderRadius='10px'
          gap='20px'
          padding='20px'
          boxShadow='0px 4px 8px rgba(0, 0, 0, 0.1)'
          style={{
            width: '81%',
          }}
        >
          <TextField
            label='Location'
            variant='outlined'
            fullWidth
            margin='normal'
            InputProps={{
              style: fontStyle,
            }}
            InputLabelProps={{
              style: fontStyle,
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: '50px',
              },
            }}
          />
          <TextField
            label='Preferred pet'
            variant='outlined'
            select
            fullWidth
            margin='normal'
            InputProps={{
              style: fontStyle,
            }}
            InputLabelProps={{
              style: fontStyle,
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: '50px',
              },
            }}
          >
            <MenuItem sx={menuItemStyle} value='Dog'>
              Dog
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Cat'>
              Cat
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Bird'>
              Bird
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Rabbit'>
              Rabbit
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Small mammals'>
              Small mammals
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Exotic pet'>
              Exotic pet
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='No preference'>
              No preference
            </MenuItem>
          </TextField>

          <TextField
            label='Experience level'
            variant='outlined'
            select
            fullWidth
            margin='normal'
            InputProps={{
              style: fontStyle,
            }}
            InputLabelProps={{
              style: fontStyle,
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: '50px',
              },
            }}
          >
            <MenuItem sx={menuItemStyle} value='Entry'>
              Entry (less than 1 year)
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Junior'>
              Junior (1-3 years)
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Mid-Level'>
              Mid-Level (3-5 years)
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Senior'>
              Senior (5-10 years)
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Expert'>
              Expert (10+ years)
            </MenuItem>
          </TextField>
          <Button
            variant='contained'
            sx={{
              height: '40px',
              fontFamily: 'fontStyle',
              fontSize: '0.9rem',
              backgroundColor: '#6C63FF',
              textTransform: 'none',
              transition: 'background-color 0.3s ease',
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

      {/* Recommended Caregivers Carousel */}
      <Box display='flex' justifyContent='center' flexDirection='column' mb={4}>
        <Typography
          variant='h6'
          gutterBottom
          style={{
            marginLeft: '12.9rem',
            fontFamily: 'fontStyle',
            fontWeight: 'bold',
          }}
        >
          Recommended caregivers in your area
        </Typography>
        <Box
          width='100vw'
          overflow='hidden'
          style={{ backgroundColor: '#D1D0D0', padding: '30px 20px' }}
        >
          <Box
            display='flex'
            alignItems='center'
            padding='0px 115px'
            gap='30px'
          >
            <IconButton>
              <ArrowBackIos />
            </IconButton>
            <Box
              display='flex'
              justifyContent='center'
              overflow='auto'
              gap='70px'
              flex='1'
              style={{
                flexWrap: 'wrap',
              }}
            >
              {caregivers.map((caregiver, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '270px',
                    padding: '20px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                  }}
                >
                  {/* Avatar Section - Photo on the Left */}
                  <Avatar
                    alt={caregiver.name}
                    src=''
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '10px',
                      marginRight: '10px',
                      fontFamily: 'fontStyle',
                    }}
                  />

                  {/* Information Section - On the Right */}
                  <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    gap='5px'
                  >
                    <Typography
                      variant='h6'
                      fontWeight='bold'
                      fontSize='0.98em'
                      textAlign='center'
                      style={{ fontFamily: 'fontStyle' }}
                    >
                      {caregiver.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      textAlign='center'
                      fontSize='0.8rem'
                      style={{ fontFamily: 'fontStyle' }}
                    >
                      Experience level: {caregiver.experience}
                    </Typography>

                    {/* Star Rating Section */}
                    <Box display='flex' gap='5px'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} style={{ color: '#FFD700' }} />
                      ))}
                    </Box>

                    <Button
                      variant='contained'
                      sx={{
                        marginTop: '10px',
                        backgroundColor: '#6C63FF',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        borderRadius: '5px',
                        padding: '8px 12px',
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontFamily: 'fontStyle',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#EACFFE',
                          color: '#000000',
                        },
                      }}
                    >
                      View profile
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
            <IconButton>
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* My Pet Section */}
      <Box display='flex' justifyContent='center' mb={4}>
        <Box width='100%' maxWidth='1200px'>
          <Typography
            variant='h6'
            gutterBottom
            style={{
              fontFamily: 'fontStyle',
              fontWeight: 'bold',
              marginLeft: '9.9rem',
              marginBottom: '20px',
            }}
          >
            My Pet
          </Typography>
          <Box
            display='flex'
            justifyContent='center'
            gap='270px'
            flexWrap='wrap'
          >
            <Box
              sx={{
                ...cardStyle,
                width: '310px',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: '10px',
                gap: '25px',
              }}
            >
              <Box>
                <img
                  src={advertisementImage}
                  alt='Pet'
                  style={{
                    width: '100%',
                    borderRadius: '10px',

                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Box style={{ paddingTop: '20px' }}>
                <Typography
                  variant='body1'
                  style={{
                    fontFamily: 'fontStyle',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Name: Danny
                </Typography>
                <Typography style={{ fontFamily: 'fontStyle' }} variant='body2'>
                  Gender: Male
                </Typography>
                <Typography style={{ fontFamily: 'fontStyle' }} variant='body2'>
                  Age: 3 years
                </Typography>
                <Button
                  onClick={navigateToPetProfile}
                  variant='contained'
                  sx={{
                    marginTop: '35px',
                    fontFamily: 'fontStyle',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    backgroundColor: '#6C63FF',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#EACFFE',
                      color: '#000000',
                    },
                  }}
                >
                  View profile
                </Button>
              </Box>
            </Box>
            <Box
              // sx={cardStyle}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Typography
                variant='body1'
                gutterBottom
                style={{
                  fontFamily: 'fontStyle',
                  fontSize: '1.3rem',
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold',
                }}
              >
                Would you like to add more pets?
              </Typography>
              <Button
                sx={{
                  fontFamily: 'fontStyle',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  marginTop: '30px',
                  textTransform: 'none',
                  backgroundColor: '#6C63FF',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#EACFFE',
                    color: '#000000',
                  },
                }}
                variant='contained'
                onClick={() => navigate('/create-pet-profile')}
              >
                Create profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Advertisement Section */}
      <Box
        width='100vw'
        style={{
          marginTop: '80px',
          marginBottom: '200px',
          backgroundColor: '#D1D0D0',
          padding: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '150px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            maxWidth: '600px',
          }}
        >
          <Typography
            variant='body1'
            gutterBottom
            style={{
              fontFamily: 'fontStyle',
              fontSize: '1.7rem',
              fontWeight: 'bold',
              marginBottom: '30px',
            }}
          >
            When you need to hire a trusted pet caregiver – PawCare will find
            them for you for free.
          </Typography>
          <Box display='flex' gap='10px' marginTop='10px'>
            <img
              src={googlePlayLogo}
              alt='Google Play'
              style={{ width: '120px' }}
            />
            <img
              src={appStoreLogo}
              alt='App Store'
              style={{ width: '120px' }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <img
            src={petImage}
            alt='Advertisement'
            style={{
              width: '100%', // Make the image take up most of the container's width
              maxWidth: '300px', // Set a maximum width to keep a good size for the image
              borderRadius: '10px',
            }}
          />
        </Box>
      </Box>
      {/* Footer */}
      <Box textAlign='center' padding='20px' color='#888888'>
        <Typography variant='body2'>&copy; 2024 PawCare</Typography>
        {/* <Typography variant='body2'>CONNECT WITH US</Typography> */}
      </Box>

      {/* Send Message Modal */}
      <Modal open={messageOpen} onClose={handleCloseMessage}>
        <Box
          position='fixed'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          width='400px'
          bgcolor='background.paper'
          p={4}
          boxShadow={24}
          borderRadius='10px'
        >
          <Typography variant='h6' mb={2}>
            Send Message to {selectedPet?.name}
          </Typography>
          <TextField
            label='Message'
            variant='outlined'
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin='normal'
            multiline
            rows={4}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default PetOwnerDashboard;
