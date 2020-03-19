import React, { Component } from 'react'
import ChildTask from './ChildTask'

export class ChildTasks extends Component {
  render() {
    return (
      <div className='child-tasks__container'>
        {this.props.tasks.map((task) => (
          <ChildTask {...task} />
        ))}
      </div>
    )
  }
}

export default ChildTasks
