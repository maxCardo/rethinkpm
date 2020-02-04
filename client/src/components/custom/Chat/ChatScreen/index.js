import React, { Component } from 'react'
import ChatUI from '../common/ChatUI'
import Contacts from '../common/Contacts'
import Profile from './Profile'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {UPDATE_CHATS} from '../../../../actions/type'
import axios from 'axios';

import './chat-screen.css'

export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeChat: 0,
      chats: [],
    }
    this.addChat = this.addChat.bind(this)
    this.chatRef = React.createRef()
    this.sendMessage = this.sendMessage.bind(this)
    this.getChats = this.getChats.bind(this)
    this.socket = io.connect(process.env.REACT_APP_SOCKET_BACKEND ? process.env.REACT_APP_SOCKET_BACKEND : '')
    if(!this.props.chats || !this.props.chats.length) {
      this.getChats()
    }
    this.forceUpdate(() => {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    })
    
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
            sender: message.from == 'User-SMS' ? chat.inq.prospect.name : message.from,
            content: message.message,
            userMessage: message.from !== 'User-SMS'
          })),
          notes: []
        }
      })

        this.props.updateChats(chatsParsed)
        this.forceUpdate(() => {
          this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
        })
      })
  }
  render() {
    console.log(this.props.chats[this.state.activeChat])
    if(!this.props.chats || !this.props.chats.length) return "";
    return (
      <div className='container-fluid h-100'>
        <div className='row h-100'>
          <div className='col-sm-3 chat-screen__contacts-container'>
            <Contacts contacts={this.props.chats} handleAddChat={this.addChat} />
          </div>
          <div className='col-sm-6 h-100 chat-screen__chat-container'>
            <ChatUI 
              messages={this.props.chats[this.state.activeChat].messages}
              onSendMessage={this.sendMessage}
              chatRef={this.chatRef}
              botOn={this.props.chats[this.state.activeChat].botOn}
            />
          </div>
          <div className='col-sm-3'>
            <Profile name={this.props.chats[this.state.activeChat].name} notes={this.props.chats[this.state.activeChat].notes} /> 
          </div>
        </div>
      </div>
    )
  }
  addChat(indexOfContact) {
    this.setState({activeChat: indexOfContact})
    this.forceUpdate(() => {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    })
  }
  sendMessage(messageContent) {
    const chats = this.props.chats.slice()
    chats[this.state.activeChat].messages.push({
      userMessage: true,
      sender: 'Admin',
      content: messageContent,
      date: new Date()
    })
    const message = {
      from: 'Admin',
      message: messageContent,
      date: new Date()
    }
    const chat = chats[this.state.activeChat]

    this.socket.emit('ui_msg', {chatID: chat.id, phoneNumber: '0034644494894', msg: message})
    this.props.updateChats(chats)
    this.forceUpdate(() => {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    })
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
