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
const UnitSchedule = ({units, listingId}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const handleAdd = () => {
    console.log('add')
    setShowAddModal(true)
  }
  const submitAddUnit = (unit) => {
    const data = {
      unit
    }
    axios.post(`/listings/${listingId}/addUnitSch`, data)
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
      <Table headers={headers} data={units}/>
      <AddUnitSchModal show={showAddModal} handleClose={() => setShowAddModal(false)} handleSubmit={submitAddUnit}/>
    </Fragment>
  )
}

export default UnitSchedule;