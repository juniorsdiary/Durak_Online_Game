import React from 'react';
import PropTypes from 'prop-types';
import { EachCard } from 'Components';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  cardPlace: {
    width: '99px',
    height: '136px',
    borderRadius: '5px',
    margin: '0 10px 0 10px',
  },
});

const GameFieldCardPlace = ({ offenceCardData, defenceCardData }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.cardPlace}>
      <EachCard cardData={offenceCardData} rotated />
      {defenceCardData.length && <EachCard cardData={defenceCardData} margin={`20px 0 0 20`} rotated beaten />}
    </Paper>
  );
};

GameFieldCardPlace.propTypes = {
  offenceCardData: PropTypes.array,
  defenceCardData: PropTypes.array,
};

GameFieldCardPlace.defaultProps = {
  offenceCardData: [],
  defenceCardData: [],
};

export default GameFieldCardPlace;
