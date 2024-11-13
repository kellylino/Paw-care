import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import logo from './assets/logo-no-background.png';

const LoginPage = ({ onLogin }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.token); // Pass token to the parent component if needed
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  // Function to handle signup
  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoginForm(true); // Switch to login form after successful registration
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <video
        src="/back.mp4"
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
      />

      <Box position="absolute" top="80px" right="125px" display="flex" flexDirection="column" alignItems="flex-end">
        <img src={logo} alt="Paw Care Logo" style={{ width: '120px', marginBottom: '20px' }} />
        <Typography variant="subtitle1" style={{ color: '#000000', textAlign: 'right', marginTop: '30px', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase' }}>
          Trusted pet sitters and walkers at your fingertips.
          <br />
          Care for your pets, whenever you need it.
        </Typography>
      </Box>

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
          zIndex: 1,
        }}
      >
        <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {isLoginForm ? 'Login' : 'Sign Up'}
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        {/* Form Fields */}
        {!isLoginForm && (
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              '& .MuiInputLabel-root': {
                color: '#BDBDBD',
              },
            }}
          />
        )}
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#BDBDBD',
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#BDBDBD',
            },
          }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#6C63FF',
            color: '#FFFFFF',
            marginTop: '20px',
            padding: '10px 0',
            fontWeight: 'bold',
            transition: 'background-color 0.4s ease, color 0.4s ease',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#EACFFE',
              color: '#000000',
            },
            marginBottom: '5px',
          }}
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? 'Login' : 'Sign Up'}
        </Button>

        {/* Links to Switch Forms */}
        <Box display="flex" justifyContent="space-between" marginTop="10px" flexDirection="column" gap="0.5rem">
          {isLoginForm ? (
            <>
              <Typography variant="body2">
                <a href="#signup" style={{ color: '#6C63FF', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); setIsLoginForm(false); }}>
                  <span style={{ color: '#9F9B9B' }}>Don’t have an account? </span>
                  <span style={{ fontWeight: 'bold' }}>Sign Up</span>
                </a>
              </Typography>
            </>
          ) : (
            <Typography variant="body2" style={{ margin: '0 auto' }}>
              <a href="#login" style={{ color: '#6C63FF', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); setIsLoginForm(true); }}>
                <span style={{ color: '#9F9B9B' }}>Already have an account? </span>
                <span style={{ fontWeight: 'bold' }}>Login</span>
              </a>
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
