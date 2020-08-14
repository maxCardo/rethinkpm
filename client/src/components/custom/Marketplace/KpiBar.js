import React, { Component } from 'react'
import KpiItem from './KpiItem'

export class KpiBar extends Component {
  constructor(props) {
    super(props);
    this.kpis= [
      {
        title: '# of listings',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: '# of days from active to contigent',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: 'Avg sale price',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
    ]
  }
  render() {
    return (
      <div className='kpi-bar__container'>
        {this.kpis.map((kpi) => (
          <KpiItem title={kpi.title} endpoint={kpi.endpoint} />
        ))}
      </div>
    )
  }
}

export default KpiBar
