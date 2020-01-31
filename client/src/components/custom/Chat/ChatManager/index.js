import React, { Component } from 'react'

import Chat from './Chat'
import ChatInitiator from './ChatInitator'
import { connect } from 'react-redux';
import {UPDATE_CHATS, OPEN_CHAT, CLOSE_CHAT} from '../../../../actions/type'

import './chatManager.css'

export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [
      ],
      chats: [
      ]
    }
    this.refsArray = this.state.chats.map(() => {
      return React.createRef();
    })
    this.handleAddChat = this.handleAddChat.bind(this)
    if(!this.props.chats || !this.props.chats.length) {
      this.getChats()
    }
    
  }
  async getChats() {
    fetch('http://localhost:5000/api/rent_lead/chats').then((response) => response.json())
      .then((json) => {
        const chatsParsed = json.map((chat) => {
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
        // this.forceUpdate(() => {
        //   this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
        // })
      })
  }
  render() {
    return (
      <div className='chat-manager__container'>
        <ChatInitiator contacts={this.props.chats} onAddChat={this.handleAddChat}/>
        {this.props.openChats.map((chatId, index) => {
          const chat = this.props.chats.find((chat) => chat.id === chatId)
          return <Chat key={`chat-${index}`} id={chat.id} ref={this.refsArray[index]} open={chat.open} name={chat.name} messages={chat.messages} status={chat.status} onClose={this.closeChat.bind(this,chatId)} botOn={chat.botOn}/>
        })}
      </div>
    )
  }
  handleAddChat(chatToAdd) {
    const openChats = this.props.openChats
    let chatAlreadyAdded = false;
    let index = -1;
    openChats.forEach((chatId, i) => {
      if(chatId === chatToAdd.id) {
        chatAlreadyAdded = true
        index = i
      }
    })
    if(chatAlreadyAdded) {
      this.refsArray[index].current.toggleOpen()
    } else {
      this.props.openChat(chatToAdd.id)
      this.refsArray.push(React.createRef())
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

export default connect(mapStateToProps, mapDispatchToProps)(index)
