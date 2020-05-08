import React, { Component } from 'react'

export class Pill extends Component {
    constructor(props) {
        super(props)
        let text = this.props.text;
        if (text.length > 20) {
            text = this.props.text.slice(0, 20) + '...'
        };
        this.state = {
            text,
            expanded: false,
        }
        this.togglePill = this.togglePill.bind(this)
    }
    render() {
        return (
            <div className='pill__container' onClick={this.togglePill}>
                {this.state.text}
            </div>
        )
    }
    togglePill() {
        if (this.props.text.length <= 20) return
        if (this.state.expanded) {
            this.setState({
                text: this.props.text.slice(0, 20) + '...',
                expanded: false,
            })
        } else {
            this.setState({
                text: this.props.text,
                expanded: true,
            })
        }
    }
}

export default Pill
