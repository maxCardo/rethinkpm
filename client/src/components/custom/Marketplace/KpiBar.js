import React from 'react'
import KpiItem from './KpiItem'

const KPIS = [
      {
        title: 'Listings',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: 'Days from active to contigent',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: 'Avg sale price',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: 'Households',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: 'Median wages',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: 'Other',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: 'Other',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
      {
        title: 'Other',
        endpoint: '/api/sales/kpi/numberOfListings'
      },
    ]

const KpiBar = () => {
  return (
    <div className='kpi-bar__container'>
      {KPIS.map((kpi) => (
        <KpiItem title={kpi.title} endpoint={kpi.endpoint} />
      ))}
    </div>
  )
}

export default KpiBar
