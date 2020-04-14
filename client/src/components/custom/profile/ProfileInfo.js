import React, { Component } from 'react'
import ProfileIcon from '../common/ProfileIcon';
import {connect} from 'react-redux'

export class ProfileInfo extends Component {
  render() {
    return (
      <div className='profile-info__main-container'>
        <div className='profile-info__icon-container'>
          <ProfileIcon name={'Tests'} size={80} />
        </div>
        <div className='profile-info__data-container'>
          {this.props.attributes.map((attribute) => {
            return (<p>{attribute.name}: {ProfileInfo.getData(this.props.inquiry, attribute)}</p>)
          })}
        </div>
      </div>
    )
  }
  static getData(dataItem, header) {
    if(header.reactComponent) {
      return header.render(dataItem)
    } else {
      const {accessor} = header
      if(accessor.includes('.')) {
        const accessorsArray = accessor.split('.')
        let item = dataItem;
        accessorsArray.forEach((accessor) => {
          if(item) {
            item = item[accessor]
          }
        })
        return item 
      } else {
        return dataItem[accessor] 
      }
    }
  }
}

const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiriesRaw
})


export default connect(mapStateToProps)(ProfileInfo)
