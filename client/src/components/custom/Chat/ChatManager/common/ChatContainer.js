import React, { Component } from 'react'
import TopBar from './TopBar'
import { connect } from 'react-redux';
import {TOGGLE_OPEN_CHAT} from '../../../../../actions/type'
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
        <div className='chat__content' style={{display: this.props.open ? 'block' : 'none'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
  toggleOpen() {
    this.props.toggleOpen(this.props.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleOpen:(chatId) => dispatch({type: TOGGLE_OPEN_CHAT, payload: chatId}),
  }
}

const mapStateToProps = state => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
