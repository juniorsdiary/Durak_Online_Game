import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, TextField, FormControlLabel, RadioGroup, FormLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'Utilities';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(2),
    '& h2': {
      fontWeight: 'bold',
    },
  },
  form: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  radioWrapper: {
    flexDirection: 'row',
  },
}));

const Settings = ({ open, handleSettingsModal, checkRoomsData }) => {
  const textData = useSelector(state => state.commonData.typography.lobbyPage);
  const [values, setValue] = useForm({
    roomName: '',
    players: '2',
    cards: '36',
    access: 'Public',
    password: '',
  });
  const classes = useStyles();
  const closeDialog = useCallback(() => {
    handleSettingsModal(false);
  }, [handleSettingsModal]);

  const submitValue = useCallback(
    e => {
      e.preventDefault();
      checkRoomsData(values);
    },
    [checkRoomsData, values]
  );
  return (
    <Dialog onClose={closeDialog} open={open}>
      <DialogTitle className={classes.title}>{textData[7]}</DialogTitle>
      <form onSubmit={submitValue} className={classes.form}>
        <TextField id='roomName' name='roomName' required label={textData[8]} onChange={setValue} value={values.roomName} margin='normal' />
        <FormLabel className={classes.margin}>{textData[9]}</FormLabel>
        <RadioGroup className={classes.radioWrapper} aria-label='players' name='players' value={values.players} onChange={setValue}>
          <FormControlLabel value='2' control={<Radio />} label='2' />
          <FormControlLabel value='3' control={<Radio />} label='3' />
          <FormControlLabel value='4' control={<Radio />} label='4' />
        </RadioGroup>
        <FormLabel className={classes.margin}>{textData[10]}</FormLabel>
        <RadioGroup className={classes.radioWrapper} aria-label='cards' name='cards' value={values.cards} onChange={setValue}>
          <FormControlLabel value='36' control={<Radio />} label='36' />
          <FormControlLabel value='52' control={<Radio />} label='52' />
        </RadioGroup>
        <FormLabel className={classes.margin}>{textData[11]}</FormLabel>
        <RadioGroup className={classes.radioWrapper} aria-label='access' name='access' value={values.access} onChange={setValue}>
          <FormControlLabel value='Public' control={<Radio />} label={textData[13]} />
          <FormControlLabel value='Private' control={<Radio />} label={textData[12]} />
        </RadioGroup>
        <TextField
          id='password'
          name='password'
          type='password'
          required
          disabled={values.access !== 'Private'}
          label={textData[14]}
          value={values.password}
          onChange={setValue}
        />
        <Button variant='contained' color='secondary' type='submit' className={classes.margin}>
          {textData[15]}
        </Button>
      </form>
    </Dialog>
  );
};

Settings.propTypes = {
  open: PropTypes.bool,
  handleSettingsModal: PropTypes.func,
  checkRoomsData: PropTypes.func,
};

export default Settings;
