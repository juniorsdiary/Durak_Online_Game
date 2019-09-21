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
  }
  handleChange = e => {
    const messageValue = e.target.value;
    this.setState({ messageValue });
  };
  handleSubmit = message => {
    const { socket, name } = this.props;
    socket.emit('sendMessage', { message, name });
  };
  render() {
    const { classes, messages, textData } = this.props;
    const renderMessages = messages.map((msg, i) => <MessageComponent key={i} {...msg} />);
    return (
      <Grid item xs={4} className={classes.wrapper}>
        <Typography align='center' variant='h4'>
          {textData[2]}
        </Typography>
        <Grid container direction='column' spacing={1} className={classes.content}>
          {renderMessages}
        </Grid>
        <SendMessageComponent text={textData[3]} submit={this.handleSubmit} />
      </Grid>
    );
  }
}

ChatSection.propTypes = {
  socket: PropTypes.object,
  name: PropTypes.string,
  classes: PropTypes.object,
  setMessagesData: PropTypes.func,
  messages: PropTypes.array,
  textData: PropTypes.array,
};

const StyledReactComponent = withStyles(styles)(ChatSection);

const ReduxConnected = connect(
  state => ({
    socket: state.authentication.socket,
    name: state.commonData.userData.user,
    messages: state.commonData.messages,
  }),
  dispatch => ({
    setMessagesData: data => {
      dispatch({ type: 'SET_MESSAGES', payload: data });
    },
  })
)(StyledReactComponent);

export default ReduxConnected;
