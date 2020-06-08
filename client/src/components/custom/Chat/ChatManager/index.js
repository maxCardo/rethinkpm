import React, { Component } from 'react'

import Chat from './Chat'
import ChatInitiator from './ChatInitator'
import { connect } from 'react-redux';
import {UPDATE_CHATS, OPEN_CHAT, CLOSE_CHAT} from '../../../../actions/type'
import axios from 'axios';

import './chatManager.css'

export class ChatManager extends Component {
  constructor(props) {
    super(props)
    this.handleAddChat = this.handleAddChat.bind(this)
    if(!this.props.chats || !this.props.chats.length) {
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
    return (
      <div className='chat-manager__container'>
        <ChatInitiator contacts={this.props.chats} onAddChat={this.handleAddChat}/>
        {this.props.openChats.map((chatId, index) => {
          const chat = this.props.chats.find((chat) => chat.id === chatId)
          return <Chat key={`chat-${index}`} id={chat.id}  open={chat.open} name={chat.name} messages={chat.messages} status={chat.status} onClose={this.closeChat.bind(this,chatId)} botOn={chat.botOn}/>
        })}
      </div>
    )
  }
  handleAddChat(chatToAdd) {
    const openChats = this.props.openChats
    let chatAlreadyAdded = false;
    openChats.forEach((chatId, i) => {
      if(chatId === chatToAdd.id) {
        chatAlreadyAdded = true
      }
    })
    if(!chatAlreadyAdded) {
      this.props.openChat(chatToAdd.id)
    }
  }
  closeChat(id) {
    this.props.closeChat(id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateChats:(chats) => dispatch({type: UPDATE_CHATS, payload: chats}),
    openChat: (chatId) => dispatch({type: OPEN_CHAT, payload: chatId}),
    closeChat: (chatId) => dispatch({type: CLOSE_CHAT, payload: chatId})
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chat.chats,
    openChats: state.chat.openChats
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatManager)
