import React from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo-no-background.png';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Video Background */}
      <video
        src='/back.mp4'
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Logo and Tagline */}
      <Box
        position='absolute'
        top='80px'
        right='125px'
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
      >
        <img
          src={logo}
          alt='Paw Care Logo'
          style={{
            width: '120px',
            marginBottom: '20px',
            right: '0px',
          }}
        />
        <Typography
          variant='subtitle1'
          style={{
            color: '#000000',
            textAlign: 'right',
            marginTop: '30px',
            fontWeight: '700',
            fontSize: '1rem',
            textTransform: 'uppercase',
          }}
        >
          Trusted pet sitters and walkers at your fingertips.
          <br />
          Care for your pets, whenever you need it.
        </Typography>
      </Box>

      {/* Login Form */}
      <Box
        style={{
          position: 'absolute',
          right: '125px',
          width: '325px',
          padding: '30px',
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          top: '35%',
          // marginTop: '100px',

          zIndex: 1, // Ensures the login form appears above the video
        }}
      >
        <Typography
          variant='h5'
          style={{ fontWeight: 'bold', marginBottom: '20px' }}
        >
          Login
        </Typography>
        <TextField
          fullWidth
          label='Email'
          margin='normal'
          variant='standard'
          InputLabelProps={{ style: { color: '#BDBDBD' } }}
        />
        <TextField
          fullWidth
          label='Password'
          type='password'
          margin='normal'
          variant='standard'
          InputLabelProps={{ style: { color: '#BDBDBD' } }}
        />
        <Button
          fullWidth
          variant='contained'
          style={{
            backgroundColor: '#6C63FF',
            color: '#FFFFFF',
            marginTop: '20px',
            padding: '10px 0',
            fontWeight: 'bold',
          }}
          onClick={onLogin}
        >
          Login
        </Button>
        <Box display='flex' justifyContent='space-between' marginTop='10px'>
          <Typography variant='body2'>
            <a
              href='#forgot-password'
              style={{ color: '#6C63FF', textDecoration: 'none' }}
            >
              Forgot <span style={{ fontWeight: 'bold' }}>Password?</span>
            </a>
          </Typography>
          <Typography variant='body2'>
            <a
              href='#signup'
              style={{ color: '#6C63FF', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
              }}
            >
              Don’t have an account?{' '}
              <span style={{ fontWeight: 'bold' }}>Signup</span>
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
