import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './assets/logo-no-background.png';
import welcomeImage from './assets/welcome.png';
import welcomeImage2 from './assets/welcome-1.png';

function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('User');

  useEffect(() => {
    if (location.state && location.state.username) {
      setUsername(location.state.username);
    } else {
      const storedUser = localStorage.getItem('username');
      if (storedUser) {
        setUsername(storedUser);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state && location.state.username) {
      localStorage.setItem('username', location.state.username);
    }
  }, [location.state]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f3f3f3',
        position: 'relative',
      }}
    >
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
        <Box display='flex' alignItems='center' gap='10px'>
          <img
            src={logo}
            alt='Paw Care Logo'
            style={{ width: '120px', height: '50px' }}
          />
        </Box>
        <Button
          color='primary'
          onClick={() => {
            localStorage.removeItem('username');
            navigate('/');
          }}
          style={{
            color: '#6C63FF',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Log out
        </Button>
      </Box>

      <Container
        maxWidth='md'
        style={{
          textAlign: 'center',
          marginTop: '100px',
          color: '#000000',
          paddingLeft: '10px',
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            fontFamily: 'RobotoSlab, serif',
            marginBottom: '25px',
          }}
        >
          WELCOME TO THE PAWTY,{' '}
          <span style={{ color: '#6C63FF' }}>{username && username.toUpperCase()}</span>!
        </Typography>
        <Typography
          variant='h6'
          style={{ fontFamily: 'RobotoSlab, serif', fontSize: '1.5rem' }}
        >
          Tell us a bit about yourself: Are you a pet owner or a caregiver?
        </Typography>
        <Typography
          variant='h5'
          style={{
            fontWeight: 'bold',
            marginTop: '40px',
            fontFamily: 'RobotoSlab, serif',
            fontSize: '1.3rem',
          }}
        >
          LET'S GET STARTED!
        </Typography>

        {/* Profile Creation Buttons */}
        <Box display='flex' justifyContent='center' gap='50px' marginTop='60px'>
          <Button
            variant='outlined'
            onClick={() => navigate('/create-pet-owner-profile')}
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              borderColor: '#FFFFFF',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              fontWeight: 'bold',
              borderRadius: '10px',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'RobotoSlab, serif',
              fontSize: '1rem',
              textTransform: 'none',
              transition: '0.3s',
              '&:hover': {
                color: '#8F0CF0',
                transform: 'scale(1.05)',
              },
            }}
          >
            Create pet owner profile
          </Button>
          <Button
            variant='outlined'
            onClick={() => navigate('/create-caregiver-profile')}
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              borderColor: '#FFFFFF',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              fontWeight: 'bold',
              borderRadius: '10px',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'RobotoSlab, serif',
              transition: '0.3s',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                color: '#8F0CF0',
                transform: 'scale(1.05)',
              },
            }}
          >
            Create caregiver profile
          </Button>
        </Box>
      </Container>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='flex-end'
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 250px)',
          fontSize: 0,
        }}
      >
        <img
          src={welcomeImage}
          alt='welcome'
          style={{
            width: '50%',
            margin: 0,
            padding: 0,
            display: 'block',
            marginLeft: '10px',
          }}
        />
        <img
          src={welcomeImage2}
          alt='welcome'
          style={{
            width: '50%',
            margin: 0,
            padding: 0,
            display: 'block',
          }}
        />
      </Box>
      {/* 小按钮：切换到 PetOwnerDashboard 界面 */}
      <Button
        onClick={() => navigate('/pet-owner-dashboard')}
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#6C63FF',
          color: '#FFFFFF',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          minWidth: '0',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#8F0CF0',
          },
        }}
      >
        Go
      </Button>
    </Box>
  );
}

export default WelcomePage;
