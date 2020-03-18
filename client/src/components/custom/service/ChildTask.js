import React, { Component } from 'react'

export class ChildTask extends Component {
  render() {
    return (
      <div className='child-task__container'>
        <div className='child-task__content'>
          <p>ID: {this.props.id}</p>
          <p>Issue: {this.props.issue}</p>
        </div>
        <p className='child-task__status'>Status: {this.props.status}</p>
      </div>
    )
  }
}

export default ChildTask
