import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';

const ColorSwatch = ({ color }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (color.name !== 'Loading...') {
      setVisible(true);
    }
  }, [color]);

  if (color.name === 'Loading...') {
    return null;
  }

  return (
    <Fade in={visible} timeout={1000}>
      <Box
        sx={{
          backgroundColor: color.hsl,
          height: '5vw',
          margin: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body2" color="textPrimary">
          {color.name}
        </Typography>
        <Typography variant="body4" color="textSecondary">
          {color.rgb}
        </Typography>
        {/* <Typography variant="body2" color="textSecondary">
          {color.hsl}
        </Typography> */}
      </Box>
    </Fade>
  );
};

export default ColorSwatch;
