import React, { Fragment, useState, useEffect } from 'react'
import Table from '../../core/Table'
import IconButton from '../../core/IconButton/IconButton'
import AddUnitSchModal from './AddUnitSchModal'
import SetRentModal from './SetRentModal'


const UnitSchedule = ({units, listingId, addUnitSchedule, modifyUnitSchedule, deleteUnitSchedule, setRent}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRentModal, setShowRentModal] = useState(false)
  const [data, setData] = useState(units)
  const [focusedUnitSch, setFocusedUnitSch] = useState(undefined)
  const [version, setVersion] = useState(0)

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
      label: 'Rent',
      accessor: 'rent'
    },
    {
      label: 'Actions',
      reactComponent: true,
      render: (item) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <IconButton 
            placement='bottom'
            tooltipContent='Set Rent'
            id='property-details-tooltip'
            iconClass='fas fa-dollar-sign'
            variant='action-button'
            onClickFunc={() => {
              setFocusedUnitSch(item);
              setShowRentModal(true);
            }}
          />
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
              deleteUnitSchedule(item.unitType)
            }}
          />
        </div>
      )
    }
  ]

  const handleAdd = () => {
    setShowAddModal(true)
  }

  const handleModalClose = () => {
    setFocusedUnitSch(undefined);
    setShowAddModal(false);
    setShowRentModal(false);
  }
  const handleAddUnitSubmit = (unit, unitType) => {
    if(unitType) {
      modifyUnitSchedule(unit, unitType)
      setFocusedUnitSch(undefined);
    } else {
      addUnitSchedule(unit)
    }
  }

  const handleSetRentSubmit = async (rent, id) => {
    await setRent(rent, id)
    setVersion(version+1)
    setFocusedUnitSch(undefined);
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
      <Table headers={headers} data={data} version={version} scrolling={true} maxHeight='200px' />
      <AddUnitSchModal show={showAddModal} handleClose={handleModalClose} handleSubmit={handleAddUnitSubmit} editingUnitSch={focusedUnitSch} />
      <SetRentModal show={showRentModal} handleClose={handleModalClose} handleSubmit={handleSetRentSubmit} editingUnitSch={focusedUnitSch}/>
    </Fragment>
  )
}

export default UnitSchedule;