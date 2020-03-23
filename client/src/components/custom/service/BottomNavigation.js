import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

export class BottomNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }
  componentDidMount() {
    const last = this.props.location.pathname.split('/').pop()
    for(let i=0; i< this.props.screens.length; i++) {
      const screenRoute = this.props.screens[i].route
      if(last === screenRoute) {
        this.setState({active: i})
        return
      }
    }
    this.setState({active: 0})
    const newLocation = this.props.location.pathname + '/' + this.props.screens[0].route
    this.props.history.replace(newLocation)
  }
  render() {
    return (
      <div className='bottom-navigation__container'>
        <div className='bottom-navigation__screen'>
          {this.props.screens[this.state.active].component}
        </div>
        <div className='bottom-navigation__tabs'>
          {this.props.screens.map((screen, index) => (
            <button className='bottom-navigation__tab' active={(index == this.state.active).toString()} onClick={this.goToScreen.bind(this,index)}>
              {screen.display}
            </button>
          ))}
        </div>
      </div>
    )
  }
  goToScreen(index) {
    this.setState({active: index})
    const actualLocation = this.props.location.pathname
    const newLocation = actualLocation.split('/')
    newLocation[newLocation.length-1] = this.props.screens[index].route
    this.props.history.push(newLocation.join('/'))
  }
}

export default withRouter(BottomNavigation)
