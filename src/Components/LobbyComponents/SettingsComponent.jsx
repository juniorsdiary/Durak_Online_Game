import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, TextField, FormControlLabel, RadioGroup, FormLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'Utilities';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(0, 2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(0, 2),
  },
  marged: {
    margin: theme.spacing(1),
  },
  radioWrapper: {
    flexDirection: 'row',
  },
}));

const SettingsComponent = ({ open, onClose, createRoom, textData }) => {
  const [values, setValue] = useForm({
    roomName: '',
    players: '2',
    cards: '36',
    access: 'Public',
    password: '',
  });
  const [error, setError] = useState(false);
  const classes = useStyles();

  const closeDialog = useCallback(() => {
    onClose(false);
    setError(false);
  }, [onClose]);

  const create = useCallback(
    e => {
      e.preventDefault();
      if (values.roomName === '') {
        setError(true);
      } else {
        setError(false);
        createRoom(values);
        onClose(false);
      }
    },
    [createRoom, onClose, values]
  );

  return (
    <Dialog onClose={closeDialog} open={open}>
      <DialogTitle className={classes.title}>{textData[7]}</DialogTitle>
      <form onSubmit={create} className={classes.form}>
        <TextField error={error} required id='roomName' label={textData[8]} name='roomName' value={values.roomName} onChange={setValue} />
        <FormLabel className={classes.marged}>{textData[9]}</FormLabel>
        <RadioGroup className={classes.radioWrapper} aria-label='players' name='players' value={values.players} onChange={setValue}>
          <FormControlLabel value='2' control={<Radio />} label='2' />
          <FormControlLabel value='3' control={<Radio />} label='3' />
          <FormControlLabel value='4' control={<Radio />} label='4' />
        </RadioGroup>
        <FormLabel className={classes.marged}>{textData[10]}</FormLabel>
        <RadioGroup className={classes.radioWrapper} aria-label='cards' name='cards' value={values.cards} onChange={setValue}>
          <FormControlLabel value='36' control={<Radio />} label='36' />
          <FormControlLabel value='52' control={<Radio />} label='52' />
        </RadioGroup>
        <FormLabel className={classes.marged}>{textData[11]}</FormLabel>
        <RadioGroup className={classes.radioWrapper} aria-label='access' name='access' value={values.access} onChange={setValue}>
          <FormControlLabel value='Public' control={<Radio />} label={textData[13]} />
          <FormControlLabel value='Private' control={<Radio />} label={textData[12]} />
        </RadioGroup>
        <TextField
          type='password'
          disabled={values.access !== 'Private'}
          required
          id='password'
          label={textData[14]}
          name='password'
          value={values.password}
          onChange={setValue}
          margin='normal'
        />
        <Button variant='contained' color='secondary' type='submit' className={classes.marged} onClick={create}>
          {textData[15]}
        </Button>
      </form>
    </Dialog>
  );
};

SettingsComponent.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  createRoom: PropTypes.func,
  textData: PropTypes.array,
};

export default SettingsComponent;
