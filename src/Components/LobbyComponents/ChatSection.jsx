import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { MessageComponent, SendMessageComponent } from 'Components';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  wrapper: {
    padding: '0 1em',
    height: '100%',
  },
  content: {
    padding: '0',
    height: '83%',
    overflow: 'auto',
  },
};

class ChatSection extends Component {
  componentDidMount() {
    const { socket, setMessagesData } = this.props;
    socket.on('syncMessages', messages => {
      setMessagesData(messages);
    });
    socket.on('addMessage', messages => {
      setMessagesData(messages);
    });
  }
  handleChange = e => {
    const messageValue = e.target.value;
    this.setState({ messageValue });
  };
  handleSubmit = msg => {
    const { socket, nickname } = this.props;
    socket.emit('sendMessage', { msg, nickname });
  };
  render() {
    const { classes, messages } = this.props;
    const renderMessages = messages.map((msg, i) => <MessageComponent key={i} {...msg} />);
    return (
      <Grid item xs={4} className={classes.wrapper}>
        <Typography align='center' variant='h4'>
          Chat Section
        </Typography>
        <Grid container direction='column' spacing={1} className={classes.content}>
          {renderMessages}
        </Grid>
        <SendMessageComponent submit={this.handleSubmit} />
      </Grid>
    );
  }
}

ChatSection.propTypes = {
  socket: PropTypes.object,
  nickname: PropTypes.string,
  classes: PropTypes.object,
  setMessagesData: PropTypes.func,
  messages: PropTypes.array,
};

const StyledReactComponent = withStyles(styles)(ChatSection);

const ReduxConnected = connect(
  state => ({
    socket: state.authentication.socket,
    nickname: state.commonData.userData.name,
    messages: state.commonData.messages,
  }),
  dispatch => ({
    setMessagesData: data => {
      dispatch({ type: 'SET_MESSAGES', payload: data });
    },
  })
)(StyledReactComponent);

export default ReduxConnected;
