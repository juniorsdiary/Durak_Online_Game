import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { EachCardComponent } from 'Components';

const useStyles = makeStyles({
  discardPile: {
    position: 'absolute',
    top: '50%',
    right: '300px',
    width: '100px',
    marginTop: '-68px',
    height: '141px',
  },
});

const DiscardPile = ({ data }) => {
  const classes = useStyles();
  const renderDiscardPile = data.map((item, index) => (
    <EachCardComponent key={index} cardData={item} margin={`0 0 0 ${index / 3}`} />
  ));
  return <Paper className={classes.discardPile}>{renderDiscardPile}</Paper>;
};

DiscardPile.propTypes = {
  data: PropTypes.array,
};

export default DiscardPile;
