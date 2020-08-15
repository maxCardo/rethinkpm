import React from 'react'
import KpiItem from './KpiItem'

const KPIS = [
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
