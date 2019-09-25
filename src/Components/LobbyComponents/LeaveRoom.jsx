import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const LeaveRoom = ({ leaveRoom, socket, isInRoom }) => {
  const handleLeave = useCallback(() => {
    socket.emit('leaveRoom', isInRoom);
    leaveRoom();
  }, [isInRoom, leaveRoom, socket]);
  return (
    <Button variant='contained' color='primary' onClick={handleLeave}>
      Leave
    </Button>
  );
};

LeaveRoom.propTypes = {
  leaveRoom: PropTypes.func,
  socket: PropTypes.object,
  isInRoom: PropTypes.string,
};

const mapStateToProps = state => ({
  socket: state.authentication.socket,
  isInRoom: state.authentication.isInRoom,
});

const mapDispatchToProps = dispatch => ({
  leaveRoom: () => {
    dispatch({ type: 'SET_ROOM_NAME', payload: '' });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveRoom);
