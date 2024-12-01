import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { format, addMonths, subMonths } from 'date-fns';

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const renderEvents = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return (
      events[formattedDate] &&
      events[formattedDate].map((event, index) => (
        <Box key={index} bgcolor="#FFD700" color="#000000" p={1} borderRadius={1} mt={1}>
          {event}
        </Box>
      ))
    );
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bgcolor="background.paper"
      boxShadow={24}
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflow="hidden"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" width="90%" mt={2} mb={2}>
        <Typography variant="h6">{format(currentDate, 'MMMM yyyy')}</Typography>
        <Box>
          <Button variant="text" onClick={() => setCurrentDate(new Date())}>Today</Button>
          <Button variant="text" onClick={handlePreviousMonth}>Back</Button>
          <Button variant="text" onClick={handleNextMonth}>Next</Button>
        </Box>
        <Box>
          <Button variant="text">Month</Button>
          <Button variant="text">Week</Button>
          <Button variant="text">Day</Button>
        </Box>
      </Box>
      <Box border="1px solid #CCCCCC" borderRadius="8px" width="90%" height="75vh" overflow="auto">
        <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%' }}>
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <th key={day} style={{ padding: '10px', border: '1px solid #CCCCCC', textAlign: 'center', backgroundColor: '#F5F5F5' }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, weekIndex) => (
              <tr key={weekIndex} style={{ height: 'calc(75vh / 6)' }}>
                {[...Array(7)].map((_, dayIndex) => {
                  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
                  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
                  const date = weekIndex * 7 + dayIndex - firstDayOfMonth + 1;

                  const currentCellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);

                  return (
                    <td key={dayIndex} style={{ padding: '10px', border: '1px solid #CCCCCC', textAlign: 'center', verticalAlign: 'top', width: '14.28%' }}>
                      {date > 0 && date <= daysInMonth && (
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
                          {renderEvents(currentCellDate)}
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
