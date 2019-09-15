import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, TextField, FormControlLabel, RadioGroup, FormLabel, FormControl, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'Utilities';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SettingsComponent = ({ open, onClose, createRoom }) => {
  const [values, setValue] = useForm({ roomname: '', players: '2', cards: '36', access: 'Public' });
  const [error, setError] = useState(false);
  const classes = useStyles();

  const closeDialog = useCallback(() => {
    onClose(false);
    setError(false);
  }, [onClose]);

  const create = useCallback(
    e => {
      e.preventDefault();
      if (values.roomname === '') {
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
      <DialogTitle>Choose Room Settings</DialogTitle>
      <form onSubmit={create} className={classes.form}>
        <TextField error={error} required id='roomname' label='Create Room Name' name='roomname' value={values.roomname} onChange={setValue} />
        <FormLabel>Players</FormLabel>
        <RadioGroup aria-label='players' name='players' value={values.players} onChange={setValue}>
          <FormControlLabel value='2' control={<Radio />} label='2' />
          <FormControlLabel value='3' control={<Radio />} label='3' />
          <FormControlLabel value='4' control={<Radio />} label='4' />
        </RadioGroup>
        <FormLabel>Number of Cards</FormLabel>
        <RadioGroup aria-label='cards' name='cards' value={values.cards} onChange={setValue}>
          <FormControlLabel value='36' control={<Radio />} label='36' />
          <FormControlLabel value='52' control={<Radio />} label='52' />
        </RadioGroup>
        <FormLabel>Set access</FormLabel>
        <RadioGroup aria-label='access' name='access' value={values.access} onChange={setValue}>
          <FormControlLabel value='Public' control={<Radio />} label='Public' />
          <FormControlLabel value='Private' control={<Radio />} label='Private' />
        </RadioGroup>
        <Button type='submit' onClick={create}>
          Create
        </Button>
      </form>
    </Dialog>
  );
};

SettingsComponent.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  createRoom: PropTypes.func,
};

export default SettingsComponent;
