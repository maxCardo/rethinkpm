import React, { Component } from 'react'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {UPDATE_CHATS} from '../../../../actions/type'
import axios from 'axios';
import ChatUI from '../../Chat/common/ChatUI'
import Contacts from '../../Chat/common/Contacts'
import './screens.css'

export class CommunicationScreen extends Component {
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
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }
  componentDidMount() {
    this.scrollToBottom()
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
  addChat(indexOfContact) {
    this.setState({activeChat: indexOfContact})
    this.scrollToBottom()
  }
  scrollToBottom() {
    this.forceUpdate(() => {
      if(this.chatRef.current) {
        this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
      }
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
    this.socket.emit('ui_msg', {chatID: chat.id, msg: message})
    this.props.updateChats(chats)
    this.scrollToBottom()
  }
  render() {
    if(!this.props.chats || !this.props.chats.length) return "";
    return (
      <div className='communication-screen__container'>
        <div className='row communication-screen__row'>
          <div className='col-sm-3 communication-screen__contacts-container'>
            <Contacts contacts={this.props.chats} handleAddChat={this.addChat} />
          </div>
          <div className='col-sm-9 communication-screen__chat-container'>
            <ChatUI 
              messages={this.props.chats[this.state.activeChat].messages}
              onSendMessage={this.sendMessage}
              chatRef={this.chatRef}
              botOn={this.props.chats[this.state.activeChat].botOn}
              scrollToBottom={this.scrollToBottom}
            />
          </div>
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(CommunicationScreen)
