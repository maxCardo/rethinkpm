import React, { Component } from 'react'

export class DetailsBar extends Component {
  render() {
    const task = this.props.task
    return (
      <div className='details-bar__container'>
        <div className='details-bar__card'>
          <div className='details-bar__top'>
            {task.parentId &&
              <p>Parent ID: {task.parentId}</p>
            }
            <p>Opened: {this.formatDate(task.opened)}</p>
          </div>
          <div className='details-bar__bottom'>
            <p>Task ID: {task.taskId}</p>
            <p>Status: {task.status}</p>
            <p>Next Date: {this.formatDate(task.nextDate)}</p>
            <p>Vendor: {task.vendor}</p>
          </div>
        </div>
      </div>
    )
  }
  formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date))
  }
}

export default DetailsBar
