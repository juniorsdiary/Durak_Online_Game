import React from 'react';
import PropTypes from 'prop-types';
import { EachCardComponent } from 'Components';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  trump: {
    width: '107px',
    height: '141px',
  },
}));

const Trump = ({ trump }) => {
  const classes = useStyles();
  return <Paper className={classes.trump}>{trump && <EachCardComponent rotated cardData={trump} />}</Paper>;
};

Trump.propTypes = {
  trump: PropTypes.array,
};

Trump.defaultProps = {
  trump: [],
};

export default Trump;
