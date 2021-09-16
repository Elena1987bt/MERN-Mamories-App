import React from 'react';
import { AppBar, Typography } from '@material-ui/core';

import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Typography variant="h2" align="center" className={classes.heading}>
        Memories
      </Typography>
      <img
        src={memories}
        alt="Memories"
        height="60"
        className={classes.images}
      />
    </AppBar>
  );
};

export default Navbar;
