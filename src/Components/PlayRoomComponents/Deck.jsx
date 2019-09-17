import React from 'react';
import PropTypes from 'prop-types';
import { EachCardComponent } from 'Components';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  deck: {
    position: 'absolute',
    width: '107px',
    height: '141px',
    top: '10%',
    left: '10%',
  },
});

function Deck({ deck }) {
  const classes = useStyles();
  let renderCards = deck.map((item, index) => (
    <EachCardComponent marginValue={index / 3} key={index} posX={item[1]} posY={item[2]} dataSuit={item[0]} dataValue={item[3]} />
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
