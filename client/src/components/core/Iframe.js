/*
INIT: ensure Babel/Eslint/Flow is configured for ES Class Fields & Static Properties
JSX USAGE: <Iframe src='http://web.site' onLoad={myOnloadFunction}/>
*/
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

class Iframe extends Component {

    static propTypes: Object = {
        src: PropTypes.string.isRequired,
        onLoad: PropTypes.func,
    }

    componentDidMount () {
        let iframe = ReactDOM.findDOMNode(this.refs.iframe)
        // iframe.addEventListener('load', this.props.onLoad); // BUG this fires twice in Chrome
        iframe.onload = () => this.props.onLoad // this event fires once
    }

    componentWillUnmount() {
        let iframe = ReactDOM.findDOMNode(this.refs.iframe)
        //iframe.removeEventListener('load');
        iframe.onload = null // destroy event handler
    }

    render () {
        const iframeStyle = {
            width: '100vw',
            height: '100vh',
            border: '0',
            position: 'absolute',
        }

        return (
            <iframe
                title="Fifth Grant Website"
                ref="iframe"
                {...this.props}
                frameBorder={'0'}
                width={'100%'}
                height={'100%'}
                style={iframeStyle}
            />
        )
    }

}

export default Iframe