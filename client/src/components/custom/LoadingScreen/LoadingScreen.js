import React, { Component } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import './style.css'

export class LoadingScreen extends Component {
  render() {
    if(this.props.loading) {
      return (
        <div className='loading-screen__container'>
          <BeatLoader 
            size={20}
            color={"#4285F4"}
            loading={true}
          />
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default LoadingScreen
