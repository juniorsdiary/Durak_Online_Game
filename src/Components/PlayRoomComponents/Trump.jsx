import React from 'react';
import PropTypes from 'prop-types';
import { EachCardComponent } from 'Components';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(() => ({
  trump: {
    position: 'absolute',
    width: '107px',
    height: '141px',
    top: '10%',
    left: '18%',
  },
}));
const Trump = ({ trump }) => {
  const classes = useStyles();
  return (
    <div className={classes.trump}>
      <EachCardComponent posX={trump[1]} posY={trump[2]} dataSuit={trump[0]} dataValue={trump[3]} rotated />
    </div>
  );
};

Trump.propTypes = {
  trump: PropTypes.array,
};

export default Trump;
