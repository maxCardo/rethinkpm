import React, { Component } from 'react'

export class DetailsBar extends Component {
  render() {
    const task = this.props.task
    return (
      <div className='details-bar__container'>
        <div className='details-bar__top'>
          {task.parentId &&
            <p><b>Parent ID:</b> {task.parentId}</p>
          }
          <p><b>Opened:</b> {this.formatDate(task.opened)}</p>
        </div>
        <div className='details-bar__bottom'>
          <p><b>Task ID:</b> {task.taskId}</p>
          <p><b>Status:</b> {task.status}</p>
          <p><b>Next Date:</b> {this.formatDate(task.nextDate)}</p>
          <p><b>Vendor:</b> {task.vendor}</p>
        </div>
      </div>
    )
  }
  formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date))
  }
}

export default DetailsBar
