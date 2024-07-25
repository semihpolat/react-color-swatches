import React from 'react';
import { Container, Typography, Box, Slider, CssBaseline } from '@mui/material';
import useColorStore from '../store/colorStore';
import ColorGrid from './ColorGrid';

const ColorSwatchApp = () => {
  const {
    saturation,
    lightness,
    setSaturation,
    setLightness,
    fetchColorNames,
    colors
  } = useColorStore();

  const handleSaturationChange = (event, newValue) => {
    setSaturation(newValue);
  };

  const handleLightnessChange = (event, newValue) => {
    setLightness(newValue);
  };

  const handleSaturationChangeCommitted = () => {
    fetchColorNames();
  };

  const handleLightnessChangeCommitted = () => {
    fetchColorNames();
  };

  return (
    <>
      <CssBaseline />
    
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100%',/*  bgcolor: 'yellow' */ }}>
          <Box sx={{ flexShrink: 0, width: '50vw', maxWidth: '50vw',mt: '3vh' }}>
            <Typography variant="h4" gutterBottom>
              HSL Color Swatches
            </Typography>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
              <Typography gutterBottom>Saturation</Typography>
              <Slider
                value={saturation}
                onChange={handleSaturationChange}
                onChangeCommitted={handleSaturationChangeCommitted}
                aria-labelledby="saturation-slider"
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
              <Typography gutterBottom>Lightness</Typography>
              <Slider
                value={lightness}
                onChange={handleLightnessChange}
                onChangeCommitted={handleLightnessChangeCommitted}
                aria-labelledby="lightness-slider"
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', width: '98vw', ml: '1vw'}}>
            <ColorGrid colors={colors} />
          </Box>
        </Box>
    
    </>
  );
};

export default ColorSwatchApp;
