import React, { Component } from 'react'
import ChatUI from '../common/ChatUI'
import Contacts from '../common/Contacts'
import Profile from './Profile'
import io from 'socket.io-client';

import './chat-screen.css'

export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeChat: 0,
      chats: [
        // { 
        //   name: 'Oscar Rodriguez - Property 1',
        //   notes: [
        //     {
        //       date: new Date(),
        //       text: 'Inquired about 123 Main Street, send first contact'
        //     },
        //     {
        //       date: new Date(),
        //       text: 'Asked about rent price, has tight budget'
        //     }
        //   ],
        //   messages: [
        //     {
        //       sender: 'Oscar Rodriguez - Property 1',
        //       content: "Good morning, I'm interest in the appartment in Baker Street",
        //       date: new Date()
        //     },
        //     {
        //       userMessage: true,
        //       content: "Good morning, would you be interested in visiting the appartment?",
        //       date: new Date()
        //     },
        //     {
        //       sender: 'Oscar Rodriguez - Property 1',
        //       content: "Yes, of course, tomorrow at 9am?",
        //       date: new Date()
        //     },
        //   ],
        // },
        // { 
        //   name: 'Tom Smith - Property 2',
        //   notes: [
        //     {
        //       date: new Date(),
        //       text: 'Already visited 3 apartments with our company, hard customer'
        //     },
        //     {
        //       date: new Date(),
        //       text: 'Last time said the rent was to high at 2000$ per month'
        //     }
        //   ],
        //   messages: [
        //     {
        //       sender: 'Tom Smith - Property 2',
        //       content: "Good morning, how much is the rent of the appartment on Lake Hill?",
        //       date: new Date()
        //     },
        //     {
        //       userMessage: true,
        //       content: "Good morning, it's 1300$ per month",
        //       date: new Date()
        //     },
        //     {
        //       sender: 'Tom Smith - Property 2',
        //       content: "Great, could we arrange a visit this week?",
        //       date: new Date()
        //     },
        //   ]
        // },
      ],
    }
    this.addChat = this.addChat.bind(this)
    this.chatRef = React.createRef()
    this.sendMessage = this.sendMessage.bind(this)
    this.getChats = this.getChats.bind(this)
    this.socket = io.connect('localhost:5000')
    
    this.getChats()
  }
  async getChats() {
    fetch('http://localhost:5000/api/rent_lead/chats').then((response) => response.json())
      .then((json) => {
        const chatsParsed = json.map((chat) => {
          return {
            id: chat._id,
            name: chat.inq.prospect.name ,
            listing: chat.inq.listing,
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

        this.setState({chats: chatsParsed})
        this.forceUpdate(() => {
          this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
        })
      })
  }
  render() {
    if(!this.state.chats.length) return "";
    return (
      <div className='container h-100'>
        <div className='row h-100'>
          <div className='col-sm-3 chat-screen__contacts-container'>
            <Contacts contacts={this.state.chats} handleAddChat={this.addChat} />
          </div>
          <div className='col-sm-6 h-100 chat-screen__chat-container'>
            <ChatUI 
              messages={this.state.chats[this.state.activeChat].messages}
              onSendMessage={this.sendMessage}
              chatRef={this.chatRef}
            />
          </div>
          <div className='col-sm-3'>
            <Profile name={this.state.chats[this.state.activeChat].name} notes={this.state.chats[this.state.activeChat].notes} /> 
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
    const chats = this.state.chats.slice()
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
    this.setState({chats})
    this.forceUpdate(() => {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    })
  }
}

export default index
