import React, { Component } from 'react'
import ChatUI from '../common/ChatUI'
import Contacts from '../common/Contacts'
import Profile from './Profile'

import './chat-screen.css'

export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeChat: 0,
      chats: [
        { 
          name: 'Oscar Rodriguez',
          notes: [
            {
              date: new Date(),
              text: 'Inquired about 123 Main Street, send first contact'
            },
            {
              date: new Date(),
              text: 'Asked about rent price, has tight budget'
            }
          ],
          messages: [
            {
              sender: 'Oscar Rodriguez',
              content: "Good morning, I'm interest in the appartment in Baker Street",
              date: new Date()
            },
            {
              userMessage: true,
              content: "Good morning, would you be interested in visiting the appartment?",
              date: new Date()
            },
            {
              sender: 'Oscar Rodriguez',
              content: "Yes, of course, tomorrow at 9am?",
              date: new Date()
            },
          ],
        },
        { 
          name: 'Tom Smith',
          notes: [
            {
              date: new Date(),
              text: 'Already visited 3 apartments with our company, hard customer'
            },
            {
              date: new Date(),
              text: 'Last time said the rent was to high at 2000$ per month'
            }
          ],
          messages: [
            {
              sender: 'Tom Smith',
              content: "Good morning, how much is the rent of the appartment on Lake Hill?",
              date: new Date()
            },
            {
              userMessage: true,
              content: "Good morning, it's 1300$ per month",
              date: new Date()
            },
            {
              sender: 'Tom Smith',
              content: "Great, could we arrange a visit this week?",
              date: new Date()
            },
          ]
        },
        
      ],
      contacts: [
        {
          name: 'Oscar Rodriguez',
          status: 'connected'
        },
        {
          name: 'Tom Smith',
          status: 'disconnected'
        },
        {
          name: 'Beatriz Espin',
          status: 'connected'
        },
      ],
    }
    this.addChat = this.addChat.bind(this)
    this.chatRef = React.createRef()
    this.sendMessage = this.sendMessage.bind(this)
  }
  render() {
    return (
      <div className='container h-100'>
        <div className='row h-100'>
          <div className='col-sm-3 chat-screen__contacts-container'>
            <Contacts contacts={this.state.contacts} handleAddChat={this.addChat} />
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
    const contactName = this.state.contacts[indexOfContact].name
    const chats = this.state.chats.slice()
    let chatAlreadyAdded = false;
    let index = -1;
    chats.forEach((chat, i) => {
      if(chat.name === contactName) {
        chatAlreadyAdded = true
        index = i
      }
    })
    if(chatAlreadyAdded) {
      this.setState({activeChat: index})
    } else {
      const chatToAdd = {
        name: contactName,
        messages: [],
        notes: []
      }
      chats.push(chatToAdd)
      this.setState({activeChat: chats.length-1, chats})
      console.log(chatToAdd)
      console.log(chats.length-1)
    }
  }
  sendMessage(messageContent) {
    const chats = this.state.chats.slice()
    chats[this.state.activeChat].messages.push({
      userMessage: true,
      content: messageContent
    })
    this.setState({chats})
    this.forceUpdate(() => {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    })
  }
}

export default index
