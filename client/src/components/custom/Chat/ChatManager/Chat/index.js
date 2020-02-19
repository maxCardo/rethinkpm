import React, { Component } from 'react'
import ChatContainer from '../common/ChatContainer'
import ChatUI from '../../common/ChatUI'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {UPDATE_CHATS} from '../../../../../actions/type'

export class index extends Component {
  constructor(props) {
    super(props);
    this.onSendMessage = this.onSendMessage.bind(this)
    this.socket = io.connect(process.env.REACT_APP_SOCKET_BACKEND ? process.env.REACT_APP_SOCKET_BACKEND : '')
    this.chatRef = React.createRef()
  }
  componentDidMount() {
    this.scrollToBottom()
  }
  
  render() {
    return (
      <ChatContainer id={this.props.id} ref={this.chatContainer} open={this.props.open} name={this.props.name} status={this.props.status} onClose={this.props.onClose}>
        <ChatUI 
          messages={this.props.messages}
          onSendMessage={this.onSendMessage}
          botOn={this.props.botOn}
          chatRef={this.chatRef}
        />
      </ChatContainer>
    )
  }
  onSendMessage(messageContent) {
    const chats = this.props.chats.slice()
    let newMessages
    const chatsMessageAdded = chats.map((chat) => {
      if(chat.id === this.props.id) {
        chat.messages.push({
          userMessage: true,
          sender: 'Admin',
          content: messageContent,
          date: new Date()
        })
        newMessages = chat.messages
      }
      return chat
    })
    const message = {
      from: 'Admin',
      message: messageContent,
      date: new Date()
    }
    this.socket.emit('ui_msg', {chatID: this.props.id, msg: message})
    this.props.updateChats(chatsMessageAdded)
    this.setState({messages: newMessages})
    this.scrollToBottom()
  }
  scrollToBottom() {
    this.forceUpdate(() => {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    })
  }
  toggleOpen() {
    this.chatContainer.current.toggleOpen()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateChats:(chats) => dispatch({type: UPDATE_CHATS, payload: chats})
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chat.chats
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
