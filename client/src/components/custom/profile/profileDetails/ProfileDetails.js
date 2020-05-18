import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            lastLocation: ''
        }
        this.changeActive = this.changeActive.bind(this)
        this.goToScreen = this.goToScreen.bind(this)
    }
    changeActive() {
        const location = this.props.location.pathname
        if (this.state.lastLocation === location) return
        const last = location.split('/').pop()
        for (let i = 0; i < this.props.screens.length; i++) {
            const screenRoute = this.props.screens[i].route
            if (last === screenRoute) {
                this.setState({ active: i, lastLocation: location })
                return
            }
        }
        this.setState({ active: 0, lastLocation: location })
        const newLocation = location + '/' + this.props.screens[0].route
        this.props.history.replace(newLocation)
    }
    render() {
        this.changeActive()
        return (
            <div className='bottom-navigation__container'>
                <div className='bottom-navigation__screen'>
                    {this.props.screens[this.state.active].component}
                </div>
                <div className='bottom-navigation__tabs'>
                    {this.props.screens.map((screen, index) => (
                        <button key={index} className='bottom-navigation__tab' active={(index === this.state.active).toString()} onClick={this.goToScreen.bind(this, index)}>
                            {screen.display}
                        </button>
                    ))}
                </div>
            </div>
        )
    }
    goToScreen(index) {
        this.setState({ active: index })
        const actualLocation = this.props.location.pathname
        const newLocation = actualLocation.split('/')
        newLocation[newLocation.length - 1] = this.props.screens[index].route
        this.props.history.push(newLocation.join('/'))
    }
}

export default withRouter(ProfileDetails)
