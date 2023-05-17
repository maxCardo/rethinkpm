import React, { Component } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import './style.css'

export class LoadingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phrase: '',
      phraseIndex: 0
    }
  }
  render() {
    const phrases = [
      'We are loading a lot of data',
      'Your data is almost ready',
      'Just a few moments more'
    ]
    if(this.props.loading) {
      if(!this.interval) {
        this.interval = setInterval(() => {
          this.setState((prevState) => ({phrase: phrases[prevState.phraseIndex] ? phrases[prevState.phraseIndex] : prevState.phrase, phraseIndex: prevState.phraseIndex+1}))
        }, 5000)
      }
      return (
        <div className='loading-screen__container'>
          <BeatLoader 
            size={20}
            color={"#4285F4"}
            loading={true}
          />
          <p>{this.state.phrase}</p>
        </div>
      )
    } else {
      if(this.interval) {
        clearInterval(this.interval)
      }
      return this.props.children
    }
  }
}

export default LoadingScreen
