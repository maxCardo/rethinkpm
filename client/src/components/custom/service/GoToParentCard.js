import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class ChildTask extends Component {
  render() {
    return (
      <div className='go-to-parent-card__container' onClick={() => this.props.history.push(`/services/${this.props.parentId}`)}>
        <p>Go back to parent</p>
      </div>
    )
  }
}

export default withRouter(ChildTask)
