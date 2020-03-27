import React, { Component } from 'react'
import ChatUI from '../common/ChatUI'
import Contacts from '../common/Contacts'
import Profile from './Profile'
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {UPDATE_CHATS, SET_INQUIRIES} from '../../../../actions/type'
import axios from 'axios';
import ChatBar from './ChatBar'

import './chat-screen.css'

export class ChatScreen extends Component {
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
    if(!this.props.inquiries || !this.props.inquiries.length) {
      this.getInquiries()
    }
    if(!this.props.chats || !this.props.chats.length) {
      this.getChats()
    }
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }
  componentDidMount() {
    this.scrollToBottom()
  }
  async getInquiries() {
    axios.get('/api/rent_lead/open_leads').then((res) => {
      const properties = new Set()
      const data = {
        upcoming: [],
        engaged: [],
        cold: [],
        scheduled: [],
        toured: [],
        application: [],
        new: [],
      }
      res.data.forEach((lead) => {
        properties.add(lead.listing)
        data[lead.status.currentStatus].push(lead)
      })

      this.props.setInquiries({inquiries: data, inquiriesRaw: res.data})
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
    if(!this.props.chats || !this.props.chats.length ) return "";
    let notes = []
    if(this.props.inquiries && this.props.inquiries.length) {
      const activeChat = this.props.chats[this.state.activeChat]
      const inquiry = this.props.inquiries.find((inquiry) => inquiry._id == activeChat.inquiryId)
      notes = inquiry.notes
    }
    return (
      <div className='container-fluid h-100'>
        <div className='row h-100'>
          <div className='col-sm-3 chat-screen__contacts-container'>
            <Contacts contacts={this.props.chats} handleAddChat={this.addChat} />
          </div>
          <div className='col-sm-6 h-100 chat-screen__chat-container'>
            <ChatBar info={this.props.chats[this.state.activeChat]}/>
            <div className='chat-screen__chat-ui'>
              <ChatUI 
                messages={this.props.chats[this.state.activeChat].messages}
                onSendMessage={this.sendMessage}
                chatRef={this.chatRef}
                botOn={this.props.chats[this.state.activeChat].botOn}
                scrollToBottom={this.scrollToBottom}
              />
            </div>
          </div>
          <div className='col-sm-3'>
            <Profile name={this.props.chats[this.state.activeChat].name} notes={notes} inquiryId={this.props.chats[this.state.activeChat].inquiryId} /> 
          </div>
        </div>
      </div>
    )
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
}

const mapDispatchToProps = dispatch => {
  return {
    updateChats:(chats) => dispatch({type: UPDATE_CHATS, payload: chats}),
    setInquiries:(inquiries) => dispatch({type: SET_INQUIRIES, payload: inquiries})
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chat.chats,
    inquiries: state.dashboard.inquiriesRaw
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
