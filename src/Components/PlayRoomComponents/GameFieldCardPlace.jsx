import React from 'react';
import PropTypes from 'prop-types';
import { EachCardComponent } from 'Components';
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
      <EachCardComponent
        posX={offenceCardData[1]}
        posY={offenceCardData[2]}
        dataSuit={offenceCardData[0]}
        dataValue={offenceCardData[3]}
        rotated
      />

      {defenceCardData.length && (
        <EachCardComponent
          posX={defenceCardData[1]}
          posY={defenceCardData[2]}
          dataSuit={defenceCardData[0]}
          dataValue={defenceCardData[3]}
          margin={`20px 0 0 20px`}
          rotated
          beaten
        />
      )}
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
