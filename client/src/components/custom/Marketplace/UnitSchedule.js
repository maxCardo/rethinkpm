import React, { Fragment, useState } from 'react'
import Table from '../../core/Table'
import IconButton from '../../core/IconButton/IconButton'
import AddUnitSchModal from './AddUnitSchModal'
import axios from 'axios'

const headers = [
  {
    label: 'Unit Type',
    accessor: 'unitType'
  },
  {
    label: 'Nº of Bedrooms',
    accessor: 'bedrooms'
  },
  {
    label: 'Nº of full bathrooms',
    accessor: 'bathsFull'
  },
  {
    label: 'Nº of partial bathrooms',
    accessor: 'bathsPartial'
  },
  {
    label: 'Total Nº of bathrooms',
    accessor: 'totalBaths'
  },
  {
    label: 'Size (sqft)',
    accessor: 'size'
  },
  {
    label: 'Nº of Units',
    accessor: 'numUnits'
  },
]
const UnitSchedule = ({units, listingId, addUnitSchedule}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [data, setData] = useState(units)
  const handleAdd = () => {
    setShowAddModal(true)
  }
  const handleSubmit = (unit) => {
    addUnitSchedule(unit)
    setData([...units, unit])
  }
  return (
    <Fragment>
      <div style={{marginBottom: 5}}>
        <IconButton 
          placement='bottom'
          fontSize={10}
          tooltipContent='Add new note'
          iconClass='fas fa-plus'
          btnClass='btn-success btn-sm'
          variant='clean'
          onClickFunc={handleAdd}
        />
      </div>
      <Table headers={headers} data={data}/>
      <AddUnitSchModal show={showAddModal} handleClose={() => setShowAddModal(false)} handleSubmit={handleSubmit}/>
    </Fragment>
  )
}

export default UnitSchedule;