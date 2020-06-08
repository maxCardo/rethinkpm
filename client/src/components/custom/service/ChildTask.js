import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class ChildTask extends Component {
  render() {
    return (
      <div className='child-task__container' onClick={() => this.props.history.push(`/services/${this.props._id}`)}>
        <div className='child-task__content'>
          <p>ID: {this.props._id}</p>
          <p>Issue: {this.props.name}</p>
        </div>
        <p className='child-task__status'>Status: {this.props.status}</p>
        {this.props.childs && this.props.childs.length ? <p className='child-task__childs-number'>Child Tasks: {this.props.childs.length}</p> : ''}
      </div>
    )
  }
}

export default withRouter(ChildTask)
