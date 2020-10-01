import React from 'react'
import KpiItem from './KpiItem'

const KPIS = [
      {
        title: 'Listings',
        endpoint: '/api/marketplace/ops/kpi/numberOfListings'
      },
      {
        title: 'Days from active to contigent',
        endpoint: '/api/marketplace/ops/kpi/numberOfListings'
      },
      {
        title: 'Avg sale price',
        endpoint: '/api/marketplace/ops/kpi/numberOfListings'
      },
      {
        title: 'Households',
        endpoint: '/api/marketplace/ops/kpi/numberOfListings'
      },
      {
        title: 'Median wages',
        endpoint: '/api/marketplace/ops/kpi/numberOfListings'
      },
      {
        title: 'Other',
        endpoint: '/api/marketplace/ops/kpi/numberOfListings'
      },
      {
        title: 'Other',
        endpoint: '/api/marketplace/ops/kpi/numberOfListings'
      },
      {
        title: 'Other',
        endpoint: '/api/marketplace/ops/kpi/numberOfListings'
      },
    ]

const KpiBar = () => {
  return (
    <div className='kpi-bar__container'>
      {KPIS.map((kpi, index) => (
        <KpiItem title={kpi.title} endpoint={kpi.endpoint} key={index} />
      ))}
    </div>
  )
}

export default KpiBar
