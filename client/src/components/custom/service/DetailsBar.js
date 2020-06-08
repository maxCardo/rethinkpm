import React, { Component } from 'react'

export class DetailsBar extends Component {
  render() {
    const service = this.props.service
    return (
      <div className='details-bar__container'>
        <div className='details-bar__card'>
          <div className='details-bar__top'>
            {service.parent &&
              <p><b>Parent ID:</b>{service.parent}</p>
            }
            <p><b>Opened:</b> {this.formatDate(service.opened)}</p>
          </div>
          <div className='details-bar__bottom'>
            <p><b>Task ID:</b>{service._id}</p>
            <p><b>Status:</b>{service.status}</p>
            <p><b>Next Date:</b>{this.formatDate(service.nextDate)}</p>
            <p><b>Vendor:</b>{service.vendor}</p>
          </div>
        </div>
      </div>
    )
  }
  formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date))
  }
}

export default DetailsBar
