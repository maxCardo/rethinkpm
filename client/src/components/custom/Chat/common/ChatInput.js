import React, { Component } from 'react'

import './common.css'

export class ChatInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      rows: 1,
			minRows: 1,
			maxRows: 99,
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }
  render() {
    return (
      <form className='chat__input-container' onSubmit={this.onSubmit}>
        <textarea
          rows={this.state.rows}
          value={this.state.message}
          placeholder='Type a message...'
          className='form-control'
          onChange={this.handleChange}
          onKeyDown={this.onKeyDown}
        />
        <button className='chat__send-button' type='submit'>
          <svg aria-hidden="true" className='chat__send-icon' focusable="false" data-prefix="fas" data-icon="chevron-circle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path></svg>
        </button>
      </form>
    )
  }
  onSubmit(e) {
    e.preventDefault()
    this.setState({message: '', rows: 1})
    if (this.state.message.replace(/\s/g, '').length) {
      this.props.onSendMessage(this.state.message)
    }
  }
  handleChange(e) {
    const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;
		
		const previousRows = e.target.rows;
  	e.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			e.target.rows = maxRows;
			e.target.scrollTop = e.target.scrollHeight;
		}
    
    this.setState({
      message: e.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  }
  onKeyDown(e) {
    if(e.keyCode === 13 && !e.shiftKey) {
      this.onSubmit(e)
    }
  }
}


export default ChatInput
