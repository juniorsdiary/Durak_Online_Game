import React from 'react';
import PropTypes from 'prop-types';
import { EachCard } from 'Components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  deck: {
    width: '100px',
    height: '141px',
  },
});

function Deck({ deck }) {
  const classes = useStyles();

  let renderCards = deck.map(item => {
    return <EachCard key={item.id} cardData={item} />;
  });

  return <Paper className={classes.deck}>{renderCards}</Paper>;
}

Deck.propTypes = {
  deck: PropTypes.array,
};

Deck.defaultProps = {
  deck: [],
};

export default Deck;
