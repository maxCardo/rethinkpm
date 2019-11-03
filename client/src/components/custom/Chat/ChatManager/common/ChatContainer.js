import React, { Component } from 'react'
import TopBar from './TopBar'
import './common.css'

export class ChatContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      open: false
    }
    if(this.props.open) {
      this.state.open = true
    }
    this.toggleOpen = this.toggleOpen.bind(this)
  }
  render() {
    return (
      <div className='chat__container'>
        <TopBar status={this.props.status} name={this.props.name} onClick={this.toggleOpen} onClose={this.props.onClose}/>
        <div className='chat__content' style={{display: this.state.open ? 'block' : 'none'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
  toggleOpen() {
    this.setState((prevState) => ({open: !prevState.open}))
  }
}

export default ChatContainer
