import React, { Component } from 'react'
import ChildTask from './ChildTask'
import GoToParentCard from './GoToParentCard'

export class ChildTasks extends Component {
  render() {
    return (
      <div className='child-tasks__container'>
        {this.props.parentId && <GoToParentCard parentId={this.props.parentId}/>}
        {this.props.tasks.map((task) => (
          <ChildTask {...task} />
        ))}
      </div>
    )
  }
}

export default ChildTasks
