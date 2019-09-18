import React from 'react';
import PropTypes from 'prop-types';
import { EachCardComponent } from 'Components';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  deck: {
    width: '107px',
    height: '141px',
  },
});

function Deck({ deck }) {
  const classes = useStyles();
  let renderCards = deck.map((item, index) => (
    <EachCardComponent margin={`0 0 0 ${index / 3}`} key={index} cardData={item} />
  ));

  return <Paper className={classes.deck}>{renderCards}</Paper>;
}

Deck.propTypes = {
  deck: PropTypes.array,
};

Deck.defaultProps = {
  deck: [],
};

export default Deck;
