import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { MessageComponent, SendMessageComponent } from 'Components';
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
    const { classes, messages, textData, name } = this.props;
    const renderMessages = messages.map((msg, i) => <MessageComponent key={i} clientName={name} {...msg} />);
    return (
      <Grid item xs={5} className={classes.wrapper}>
        <Grid component={Paper} container direction='column' spacing={2} alignItems='flex-start' wrap='nowrap' className={classes.content}>
          {renderMessages}
        </Grid>
        <SendMessageComponent textData={textData} submit={this.handleSubmit} />
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
