import React, { Component } from 'react'
import ChatUI from '../Chat/common/ChatUI'
import { connect } from 'react-redux';
import {UPDATE_CHATS} from '../../../actions/type'
import axios from 'axios';
import io from 'socket.io-client';

export class ProfileChat extends Component {
  constructor(props) {
    super(props)
    this.chatRef = React.createRef()
    this.getChats = this.getChats.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.socket = io.connect(process.env.REACT_APP_SOCKET_BACKEND ? process.env.REACT_APP_SOCKET_BACKEND : '')
    if(!this.props.chats.length) {
      this.getChats()
    }
  }
  async getChats() {
    axios.get('/api/rent_lead/chats').then((res) => {
      const chatsParsed = res.data.map((chat) => {
        return {
          id: chat._id,
          inquiryId: chat.inq ? chat.inq._id : '',
          name: chat.inq ? chat.inq.prospect.name : '' ,
          listing: chat.inq ? chat.inq.listing : '',
          unread: chat.unread,
          messages: chat.messages.map((message) => ({
            date: new Date(message.date),
            sender: message.from === 'User-SMS' ? chat.inq.prospect.name : message.from,
            content: message.message,
            userMessage: message.from !== 'User-SMS'
          })),
          notes: []
        }
      })
      this.props.updateChats(chatsParsed)
    })
  }
  render() {
    if(!this.props.chats.length) return ''
    const chat = this.props.chats.find((chat) => chat.inquiryId === this.props.inquiryId)
    if(!chat) return ''
    return (
      <ChatUI 
        messages={chat.messages}
        onSendMessage={this.sendMessage}
        chatRef={this.chatRef}
        botOn={chat.botOn}
      />
    )
  }
  sendMessage(messageContent) {
    const chats = this.props.chats.slice()
    let chatSelected;
    chats.forEach((chat) => {
      if(chat.inquiryId === this.props.inquiryId) {
        chatSelected = chat
        chat.messages.push({
          userMessage: true,
          sender: 'Admin',
          content: messageContent,
          date: new Date()
        })
      }
    })
    const message = {
      from: 'Admin',
      message: messageContent,
      date: new Date()
    }
    this.socket.emit('ui_msg', {chatID: chatSelected.id, phoneNumber: '0034644494894', msg: message})
    this.props.updateChats(chats)
    this.forceUpdate(() => {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateChats: (chats) => dispatch({type: UPDATE_CHATS, payload: chats})
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chat.chats
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileChat)
