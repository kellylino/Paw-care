import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function CalendarPage() {
  return (
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} width="100%">
        <Typography variant="h6">November 2024</Typography>
        <Box>
          <Button variant="text" onClick={() => alert('Today button clicked')}>Today</Button>
          <Button variant="text" onClick={() => alert('Back button clicked')}>Back</Button>
          <Button variant="text" onClick={() => alert('Next button clicked')}>Next</Button>
        </Box>
        <Box>
          <Button variant="text" onClick={() => alert('Month view selected')}>Month</Button>
          <Button variant="text" onClick={() => alert('Week view selected')}>Week</Button>
          <Button variant="text" onClick={() => alert('Day view selected')}>Day</Button>
        </Box>
      </Box>
      <Box border="1px solid #CCCCCC" borderRadius="8px" p={2} width="80%" maxHeight="70vh" overflow="auto">
        <table style={{ width: '100%', borderCollapse: 'collapse', height: 'auto' }}>
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <th key={day} style={{ padding: '10px', border: '1px solid #CCCCCC', textAlign: 'center', backgroundColor: '#F5F5F5' }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4].map((weekIndex) => (
              <tr key={weekIndex} style={{ height: '100px' }}>
                {[...Array(7)].map((_, dayIndex) => {
                  const date = weekIndex * 7 + dayIndex - 2;
                  return (
                    <td key={dayIndex} style={{ padding: '20px', border: '1px solid #CCCCCC', textAlign: 'center', verticalAlign: 'top', width: '14.28%' }}>
                      {date > 0 && date <= 30 && (
                        <>
                          <Typography variant="body2" gutterBottom>{date}</Typography>
                          {(date === 12 || date === 13 || date === 14) && (
                            <Box bgcolor="#00CC66" color="#FFFFFF" p={1} borderRadius={1} mt={1}>
                              Kate Elliott - Confirmed
                            </Box>
                          )}
                          {date === 25 && (
                            <Box bgcolor="#FFFFCC" color="#000000" p={1} borderRadius={1} mt={1}>
                              Kate Elliott - Pending
                            </Box>
                          )}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => window.history.back()}>
        <Close />
      </IconButton>
    </Box>
  );
}

export default CalendarPage;
