import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

function PetOwnerForm() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      width='100vw'
      sx={{
        background: 'linear-gradient(to right, #EEEEEE 50%, #e8daff 50%)',
      }}
      padding={3}
    >
      <Box
        display='flex'
        maxWidth='750px'
        backgroundColor='#FFFFFF'
        margin='0px 10px'
        borderRadius='10px'
        overflow='hidden'
        boxShadow='0px 4px 12px rgba(0, 0, 0, 0.1)'
      >
        {/* Left side text */}
        <Box
          width='45%'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          gap='0.7rem'
          padding='30px 10px 30px 35px'
        >
          <Typography
            variant='h6'
            style={{
              fontFamily: 'RobotoSlab, serif',
              fontWeight: 'bold',
              fontSize: '1.3rem',
            }}
            gutterBottom
          >
            Just a few words about you...
          </Typography>
          <Typography
            variant='body2'
            style={{
              fontFamily: 'RobotoSlab, serif',
              fontSize: '1.1rem',
            }}
          >
            Don't worry, we really care more about your pet!
          </Typography>
        </Box>

        {/* Form Section */}
        <Box width='50%' padding={5}>
          <Typography
            variant='h5'
            gutterBottom
            style={{
              fontWeight: 'bold',
              fontFamily: 'RobotoSlab, serif',
              fontSize: '1.4rem',
            }}
          >
            Create a profile
          </Typography>
          <TextField
            fullWidth
            label='Owner Full Name'
            variant='outlined'
            margin='normal'
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'Roboto Slab, serif',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Roboto Slab, serif',
              },
            }}
          />
          <TextField
            fullWidth
            label='Address'
            variant='outlined'
            margin='normal'
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'Roboto Slab, serif',
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Roboto Slab, serif',
              },
            }}
          />
          <Box marginTop={4} textAlign='center'>
            <Button
              variant='contained'
              fullWidth
              sx={{
                backgroundColor: '#6C63FF',
                color: '#FFFFFF',
                textTransform: 'none',
                fontSize: '1rem',
                fontFamily: 'Roboto Slab, serif',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                '&:hover': {
                  backgroundColor: '#EACFFE',
                  color: '#000000',
                },
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            variant='h6'
            style={{
              fontWeight: 'bold',
              fontSize: '1.3rem',
              fontFamily: 'Roboto Slab, serif',
            }}
          >
            Thanks for that!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant='body1'
            style={{ fontFamily: 'Roboto Slab, serif', fontSize: '1.2rem' }}
          >
            But now, let’s get to the real star — your pet! <br />
            Would you like to tell us about it?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: '#6C63FF',
              fontWeight: 'bold',
              fontFamily: 'Roboto Slab, serif',
              backgroundColor: '#FFFFFF',
              '&:hover': {
                color: '#8F0CF0',
              },
            }}
          >
            Yes, sure
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: '#BDBDBD',
              fontWeight: 'bold',
              fontFamily: 'Roboto Slab, serif',
              marginRight: '10px',
              backgroundColor: '#FFFFFF',
              '&:hover': {
                color: '#8F0CF0',
              },
            }}
          >
            No, I am done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PetOwnerForm;