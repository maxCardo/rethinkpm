import React, { Component } from 'react'
import ChatContainer from '../common/ChatContainer'
import ChatUI from '../../common/ChatUI'

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages.slice(),
    }
    this.onSendMessage = this.onSendMessage.bind(this)
    this.chatContainer = React.createRef()
    this.chatRef = React.createRef()
    
  }
  
  render() {
    return (
      <ChatContainer id={this.props.id} ref={this.chatContainer} open={this.props.open} name={this.props.name} status={this.props.status} onClose={this.props.onClose}>
        <ChatUI 
          messages={this.state.messages}
          chatRef={this.chatRef}
          onSendMessage={this.onSendMessage}
        />
      </ChatContainer>
    )
  }
  onSendMessage(messageContent) {
    const messages = this.state.messages.slice()
    messages.push({
      userMessage: true,
      content: messageContent
    })
    console.log(messages)
    this.setState({messages})
    this.forceUpdate(() => {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight
    })
  }
  toggleOpen() {
    this.chatContainer.current.toggleOpen()
  }
}

export default index
