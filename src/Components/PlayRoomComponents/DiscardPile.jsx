import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { EachCard } from 'Components';

const useStyles = makeStyles({
  discardPile: {
    position: 'absolute',
    top: '51%',
    right: '14.8%',
    width: '100px',
    height: '141px',
  },
});

const DiscardPile = ({ data }) => {
  const classes = useStyles();
  const renderDiscardPile = data.map((item, index) => <EachCard key={index} cardData={item} margin={`0 0 0 ${index / 3}`} />);
  return <Paper className={classes.discardPile}>{renderDiscardPile}</Paper>;
};

DiscardPile.propTypes = {
  data: PropTypes.array,
};

export default DiscardPile;
