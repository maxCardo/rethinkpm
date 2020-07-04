import React, { Component } from 'react'

import './style.css'

export class ProfileIcon extends Component {
  render() {
    const colors = ['#03a9f4','#00bcd4' , '#e91e63','#cddc39' , '#3f51b5',
    '#9c27b0' , '#009688', '#4caf50','#f44336' , '#ffeb3b', '#ff9800', '#795548' ]
      
    if(this.props.image) {
      return (
        <image src={this.props.image} className='profileIcon'></image>
      )
    } else {
      const name = this.props.name ? this.props.name : ''
      const nameParts = name.split(' ')
      let nameDisplay
      let colorNumber = 0;
      if(nameParts.length >=2) {
        nameDisplay = nameParts[0].charAt(0) + nameParts[1].charAt(0)
        colorNumber = nameParts[0].charCodeAt(0) + nameParts[1].charCodeAt(0)
      } else {
        nameDisplay = nameParts[0].charAt(0)
        colorNumber = nameParts[0].charCodeAt(0)
      }
      const iconSize = this.props.size ? this.props.size : 40

      const getColor = Math.round((colorNumber - 64 ) / 6) % 12;

      return (
        <div 
          className='profile-icon__container' 
          style={{
            background: colors[getColor],
            height: iconSize,
            width: iconSize,
            borderRadius: iconSize/2
          }}
        >
          <h3 className='profile-icon__title' style={{fontSize: (iconSize/2)-2}}>{nameDisplay}</h3>
        </div>
      )
    }
  }
}

export default ProfileIcon
