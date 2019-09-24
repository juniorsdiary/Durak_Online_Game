import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { Message, SendMessage } from 'Components';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  wrapper: {
    padding: '0 1em',
    maxHeight: '100%',
    border: '1px solid transparent',
  },
  content: {
    padding: '0',
    height: '85%',
    overflow: 'auto',
    margin: '0.75rem 0',
  },
};

class ChatSection extends Component {
  componentDidMount() {
    const { socket, setMessagesData } = this.props;
    socket.on('addMessage', message => {
      setMessagesData(message);
    });
  }
  handleChange = e => {
    const messageValue = e.target.value;
    this.setState({ messageValue });
  };
  handleSubmit = message => {
    const { socket, userData, setMessagesData } = this.props;
    socket.emit('sendMessage', { message, nickname: userData.nickname }, setMessagesData);
  };

  componentDidUpdate() {
    this.updateScroll();
  }
  updateScroll() {
    this.wrapper.scrollTop = this.wrapper.scrollHeight;
  }
  render() {
    const { classes, messages, textData, userData } = this.props;
    const renderMessages = messages.map((msg, i) => <Message key={i} clientName={userData.nickname} {...msg} />);
    return (
      <Grid item xs={5} className={classes.wrapper}>
        <Grid
          component={Paper}
          container
          direction='column'
          spacing={2}
          alignItems='flex-start'
          wrap='nowrap'
          className={classes.content}
          ref={node => (this.wrapper = node)}>
          {renderMessages}
        </Grid>
        <SendMessage textData={textData} submit={this.handleSubmit} />
      </Grid>
    );
  }
}

ChatSection.propTypes = {
  socket: PropTypes.object,
  userData: PropTypes.object,
  classes: PropTypes.object,
  setMessagesData: PropTypes.func,
  messages: PropTypes.array,
  textData: PropTypes.array,
};

const StyledReactComponent = withStyles(styles)(ChatSection);

const ReduxConnected = connect(
  state => ({
    socket: state.authentication.socket,
    userData: state.commonData.userData,
    messages: state.commonData.messages,
    textData: state.commonData.typography.lobbyPage,
  }),
  dispatch => ({
    setMessagesData: data => {
      dispatch({ type: 'ADD_MESSAGE', payload: data });
    },
  })
)(StyledReactComponent);

export default ReduxConnected;
