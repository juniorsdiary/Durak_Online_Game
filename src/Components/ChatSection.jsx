import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { MessageComponent, SendMessageComponent } from 'Components';
import { withStyles } from '@material-ui/core/styles';

// if (process.env.NODE_ENV !== 'production') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React);
// }

const styles = {
  chat: {},
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
  state = {
    messages: [],
  };
  componentDidMount() {
    const { socket } = this.props;
    socket.on('syncMsgs', messages => {
      // let filteredMsgs = messages.filter(item => item.time > connectedUsers[socket.id].connectTime);
      this.setState({ messages });
    });
    socket.on('addMsg', messages => {
      this.setState({ messages });
    });
  }
  handleChange = e => {
    const messageValue = e.target.value;
    this.setState({ messageValue });
  };
  handleSubmit = msg => {
    const { socket, nickname } = this.props;
    socket.emit('sendMsg', { msg, nickname });
  };
  render() {
    const { messages } = this.state;
    const { classes } = this.props;
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
};

ChatSection.whyDidYouRender = true;

const StyledReactComponent = withStyles(styles)(ChatSection);

const ReduxConnected = connect(state => ({
  socket: state.socket,
  nickname: state.commonData.userData.name,
}))(StyledReactComponent);

export default ReduxConnected;
