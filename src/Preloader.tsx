import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Preloader = () => {
  return (
    <Box sx={{ position: 'fixed', top: '50%',  left: '50%'}}>
      <CircularProgress />
    </Box>
  )
}

export default Preloader;


