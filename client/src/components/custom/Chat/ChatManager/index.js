import React, { Component } from 'react'

import Chat from './Chat'
import ChatInitiator from './ChatInitator'

import './chatManager.css'

export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      chats: [
        {
          name: 'Oscar Rodriguez',
          status: 'connected',
          open: false,
          messages: [
            {
              sender: 'Oscar Rodriguez',
              content: "Good morning, I'm interest in the appartment in Baker Street"
            },
            {
              userMessage: true,
              content: "Good morning, would you be interested in visiting the appartment?"
            },
            {
              sender: 'Oscar Rodriguez',
              content: "Yes, of course, tomorrow at 9am?"
            },
          ]
        },
        {
          name: 'Tom Smith',
          status: 'disconnected',
          open: false,
          messages: [
            {
              sender: 'Tom Smith',
              content: "Good morning, how much is the rent of the appartment on Lake Hill?"
            },
            {
              userMessage: true,
              content: "Good morning, it's 1300$ per month"
            },
            {
              sender: 'Tom Smith',
              content: "Great, could we arrange a visit this week?"
            },
          ]
        }
      ]
    }
    this.refsArray = this.state.chats.map(() => {
      return React.createRef();
    })
    this.handleAddChat = this.handleAddChat.bind(this)
  }
  render() {
    return (
      <div className='chat-manager__container'>
        <ChatInitiator contacts={this.state.contacts} onAddChat={this.handleAddChat}/>
        {this.state.chats.map((chat, index) => (
          !chat.closed &&
          <Chat key={`chat-${index}`} ref={this.refsArray[index]} open={chat.open} name={chat.name} messages={chat.messages} status={chat.status} onClose={this.closeChat.bind(this,index)} />
        ))}
      </div>
    )
  }
  handleAddChat(chatToAdd) {
    const chats = this.state.chats.slice()
    let chatAlreadyAdded = false;
    let index = -1;
    chats.forEach((chat, i) => {
      if(chat.name === chatToAdd.name) {
        chatAlreadyAdded = true
        index = i
      }
    })
    if(chatAlreadyAdded) {
      if(chats[index].closed) {
        chats[index].open = true
        chats[index].closed = false
      }else {
        this.refsArray[index].current.toggleOpen()
      }
      
    } else {
      chats.push(chatToAdd)
      this.refsArray.push(React.createRef())
    }
    this.setState({chats})
  }
  closeChat(index) {
    const chats = this.state.chats.slice()
    chats[index].closed = true
    this.setState({chats})
  }
}

export default index
