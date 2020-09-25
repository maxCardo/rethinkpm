import React, { Fragment } from 'react'
import Table from '../../core/Table'
import IconButton from '../../core/IconButton/IconButton'

const headers = [
  {
    label: 'Name',
    accessor: 'name'
  },
  {
    label: 'Nº of Bedrooms',
    accessor: 'bedrooms'
  },
  {
    label: 'Nº of bathrooms',
    accessor: 'bathrooms'
  },
  {
    label: 'Size (sqft)',
    accessor: 'size'
  },
  {
    label: 'Nº of Units',
    accessor: 'units'
  },
]
const RentRoles = ({roles}) => {
  const handleAdd = () => {
    console.log('Add role')
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
      <Table headers={headers} data={roles}/>
    </Fragment>
  )
}

export default RentRoles;