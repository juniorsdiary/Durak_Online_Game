import React from 'react';
import PropTypes from 'prop-types';
import { EachCard } from 'Components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  trump: {
    width: '100px',
    height: '141px',
  },
});

const Trump = ({ trump }) => {
  const classes = useStyles();
  return <Paper className={classes.trump}>{trump && <EachCard rotated cardData={trump} />}</Paper>;
};

Trump.propTypes = {
  trump: PropTypes.object,
};

Trump.defaultProps = {
  trump: [],
};

export default Trump;
