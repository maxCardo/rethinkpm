import React, { Fragment, useState, useEffect } from 'react'
import Table from '../../core/Table'
import IconButton from '../../core/IconButton/IconButton'
import AddUnitSchModal from './AddUnitSchModal'


const UnitSchedule = ({units, listingId, addUnitSchedule, modifyUnitSchedule}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [data, setData] = useState(units)
  const [focusedUnitSch, setFocusedUnitSch] = useState(undefined)

  useEffect(() => {
    setData(units)
  },[units])

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
    {
      label: 'Actions',
      reactComponent: true,
      render: (item) => (
        <div style={{display: 'flex'}}>
          <IconButton 
            placement='bottom'
            tooltipContent='Edit'
            id='property-details-tooltip'
            iconClass='fas fa-edit'
            variant='action-button'
            onClickFunc={() => {
              setFocusedUnitSch(item);
              setShowAddModal(true);
            }}
          />
          <IconButton 
            placement='bottom'
            tooltipContent='Delete'
            id='property-details-tooltip'
            btnClass='text-danger'
            iconClass='fas fa-trash'
            variant='action-button'
            onClickFunc={() => {
              console.log('delete')
            }}
          />
        </div>
      )
    }
  ]

  const handleAdd = () => {
    setShowAddModal(true)
  }
  const handleSubmit = (unit, id) => {
    if(id) {
      modifyUnitSchedule(unit, id)
    } else {
      addUnitSchedule(unit)
    }
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
      <AddUnitSchModal show={showAddModal} handleClose={() => setShowAddModal(false)} handleSubmit={handleSubmit} editingUnitSch={focusedUnitSch} />
    </Fragment>
  )
}

export default UnitSchedule;