import React from 'react';
import PropTypes from 'prop-types';
import { EachCardComponent } from 'Components';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(() => ({
  trump: {
    width: '107px',
    height: '141px',
  },
}));
const Trump = ({ trump }) => {
  const classes = useStyles();
  return (
    <div className={classes.trump}>
      <EachCardComponent rotated cardData={trump} />
    </div>
  );
};

Trump.propTypes = {
  trump: PropTypes.array,
};

export default Trump;
