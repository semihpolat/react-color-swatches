import React from 'react';
import { Grid } from '@mui/material';
import ColorSwatch from './ColorSwatch';

const ColorGrid = ({ colors }) => {
  return (
    <Grid container spacing={'0.2vw'} >
      {colors.map((color, index) => (
        <Grid item style={{width: "12vw"}} key={index}>
          <ColorSwatch color={color} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorGrid;