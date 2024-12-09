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
} from '@mui/icons-material';
import petImage from './assets/pet-image.png'; // Replace with actual image path
import logo from './assets/logo-no-background.png';
import { useNavigate } from 'react-router-dom';
import advertisementImage from './assets/advertisement-image.png';

const CaregiverDashboard = () => {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [petType, setPetType] = useState('');

  const pets = [
    {
      name: 'Snoopy',
      age: '1 year',
      gender: 'Male',
      experienceLevel: 'Junior',
      preferredPets: ['Dog', 'Cat', 'Bird'],
    },
    {
      name: 'Lucky',
      age: '2 years',
      gender: 'Male',
      experienceLevel: 'Senior',
      preferredPets: ['Dog'],
    },
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

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
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
    // search logic based on location, pet name, and pet type
  };

  const navigateToPetProfile = (pet) => {
    navigate(`/pet-profile-page`, { state: { pet } });
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
  const profileMenuId = 'primary-profile-menu';

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
                  navigate('/giver-profile');
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
            label='Pet name'
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
            label='Pet type'
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
            <MenuItem sx={menuItemStyle} value='Small mammals (e.g., hamsters)'>
              Small mammals (e.g., hamsters)
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='Exotic pet'>
              Exotic pet
            </MenuItem>
            <MenuItem sx={menuItemStyle} value='No preference'>
              No preference
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

      {/* Pets in Your Area Section */}
      <Box display='flex' justifyContent='center' flexDirection='column' mb={4}>
        <Typography
          variant='h6'
          gutterBottom
          style={{
            marginLeft: '6.5rem',
            fontFamily: 'fontStyle',
            fontWeight: 'bold',
          }}
        >
          Pets in your area looking for care
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
              {pets.map((pet, index) => (
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
                    alt='Pet'
                    src={advertisementImage}
                    style={{
                      width: '150px',
                      height: '150px',
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
                      {pet.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      textAlign='center'
                      fontSize='0.9rem'
                      style={{ fontFamily: 'fontStyle' }}
                    >
                      Age: {pet.age}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      textAlign='center'
                      fontSize='0.9rem'
                      style={{ fontFamily: 'fontStyle' }}
                    >
                      Gender: {pet.gender}
                    </Typography>

                    <Button
                      variant='contained'
                      onClick={() => navigateToPetProfile(pet)}
                      sx={{
                        marginTop: '22px',
                        backgroundColor: '#6C63FF',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        borderRadius: '5px',
                        padding: '8px 12px',
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontFamily: 'fontStyle',
                        whiteSpace: 'nowrap',
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

      {/* Upcoming Bookings and Recent Reviews Section */}
      <Box display='flex' justifyContent='center' mb={4} marginBottom='200px'>
        <Box width='100%' maxWidth='1200px'>
          <Box display='flex' justifyContent='center' gap='300px'>
            {/* Upcoming Bookings */}
            <Box display='flex' flexDirection='column'>
              <Box>
                <Typography
                  variant='h6'
                  gutterBottom
                  style={{
                    marginBottom: '15px',
                    fontFamily: 'fontStyle',
                    fontWeight: 'bold',
                  }}
                >
                  Upcoming bookings
                </Typography>
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                bgcolor='#fff'
                padding='20px'
                borderRadius='10px'
                boxShadow='0px 4px 8px rgba(0, 0, 0, 0.1)'
              >
                <Box>
                  <Box
                    Width='230px'
                    marginRight='10px'
                    textAlign='center'
                    backgroundColor='#fff'
                    display='flex'
                    flexDirection='row'
                    gap='20px'
                  >
                    <Box marginTop='10px'>
                      <Avatar
                        alt='Pet'
                        src={advertisementImage}
                        style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '10px',
                          marginRight: '10px',
                          fontFamily: 'fontStyle',
                        }}
                      />
                    </Box>
                    <Box paddingTop='20px'>
                      <Typography
                        variant='body1'
                        style={{
                          fontFamily: 'fontStyle',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                        }}
                      >
                        Pet: Lucky
                      </Typography>
                      <Typography
                        variant='body2'
                        style={{ fontFamily: 'fontStyle', fontSize: '1rem' }}
                      >
                        Owner: John Smith
                      </Typography>
                      <Typography
                        variant='body2'
                        style={{ fontFamily: 'fontStyle', fontSize: '1rem' }}
                      >
                        Date: 28.12.2024
                      </Typography>
                      <Button
                        variant='contained'
                        onClick={handleOpenCalendar}
                        sx={{
                          marginTop: '28px',
                          fontFamily: 'fontStyle',
                          textTransform: 'none',
                          whiteSpace: 'nowrap',
                          fontSize: '0.9rem',
                          backgroundColor: '#6C63FF',
                          '&:hover': {
                            backgroundColor: '#EACFFE',
                            color: '#000000',
                          },
                        }}
                      >
                        Open calendar
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Recent Reviews */}
            <Box display='flex' flexDirection='column'>
              <Box>
                <Typography
                  variant='h6'
                  gutterBottom
                  style={{
                    marginBottom: '15px',
                    fontFamily: 'fontStyle',
                    fontWeight: 'bold',
                  }}
                >
                  Recent reviews
                </Typography>
              </Box>
              <Box
                bgcolor='#fff'
                padding='20px'
                borderRadius='10px'
                boxShadow='0px 4px 8px rgba(0, 0, 0, 0.1)'
              >
                <Box display='flex' overflow='auto'>
                  <Box
                    minWidth='200px'
                    marginRight='10px'
                    padding='10px'
                    textAlign='center'
                  >
                    <Typography
                      variant='body2'
                      style={{
                        fontStyle: 'italic',
                        fontFamily: 'fontStyle',
                        fontSize: '1rem',
                      }}
                    >
                      "Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit..."
                    </Typography>
                    <Typography
                      variant='body2'
                      style={{
                        marginTop: '10px',
                        fontFamily: 'fontStyle',
                        fontSize: '1rem',
                      }}
                    >
                      Owner: Kelly White
                    </Typography>
                    <Typography
                      variant='body2'
                      style={{
                        fontFamily: 'fontStyle',
                        fontSize: '1rem',
                      }}
                    >
                      Pet: Kai
                    </Typography>
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{
                        marginTop: '20px',
                        fontFamily: 'fontStyle',
                        whiteSpace: 'nowrap',
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        backgroundColor: '#6C63FF',
                        '&:hover': {
                          backgroundColor: '#EACFFE',
                          color: '#000000',
                        },
                      }}
                    >
                      View all reviews
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
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
};

export default CaregiverDashboard;