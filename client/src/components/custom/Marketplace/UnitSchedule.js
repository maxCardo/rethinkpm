import React, { Fragment, useState, useEffect } from 'react'
import {connect} from 'react-redux'
import Table from '../../core/Table'
import IconButton from '../../core/IconButton/IconButton'
import AddUnitSchModal from './AddUnitSchModal'
import SetRentModal from './SetRentModal'


const UnitSchedule = ({units, listPrice, addUnitSchedule, modifyUnitSchedule, deleteUnitSchedule, setRent, zip, areaRents, subRents}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRentModal, setShowRentModal] = useState(false)
  const [data, setData] = useState(units)
  const [totalRents, setTotalRents] = useState({currentRents: '', areaRents: '', subRents: ''})
  const [focusedUnitSch, setFocusedUnitSch] = useState(undefined)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    console.log('subRents: ', subRents)
    let data = units
    const areaRent = areaRents.filter(area => area.searchName === zip)
    const totalCurrentRents = units.reduce((acc, unit) => acc + unit.rent, 0);
    let totalAreaRents
    let totalSubRents
    if (areaRent.length) {
      console.log('areaRent: ', areaRent);
      console.log('units: ', units);
      data = units.map((unit) => {
        unit.areaRent = Number(areaRent[0].marketPrice[`_${unit.bedrooms}BD`].med.replace('$', ''));
        return unit;
      });
      console.log('moreData: ', data);
      totalAreaRents = data.reduce((rents, unit) => rents + unit.areaRent,0)
    }
    if (subRents) {
      data = units.map((unit) => {
       unit.subRent = subRents[`${unit.bedrooms}BD`]
       return unit 
      })
      totalSubRents = data.reduce((acc, unit) => acc + unit.subRent, 0);
    }
    //get total current rent
    //get HA rents for each unit and add to unit arr
    setTotalRents({currentRents: totalCurrentRents, areaRents: totalAreaRents, subRents: totalSubRents})
    setData(data)
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
      label: ' Current Rent',
      accessor: 'rent'
    },
    {
      label: ' Area Rent',
      accessor: 'areaRent'
    },
    {
      label: ' Subsidy Rent',
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
      <div>
        <p>
          Total Rents: InPlace: {totalRents.currentRents} | Area: {totalRents.areaRents}  | Subsidy: {totalRents.subRents} <br/>         
          GRM: InPlace: {(listPrice/(totalRents.currentRents*12)).toFixed(1)} | Area: {(listPrice/(totalRents.areaRents*12)).toFixed(1)}  | Subsidy: {(listPrice/(totalRents.subRents*12)).toFixed(1)} 
        </p>
      </div>
      <AddUnitSchModal show={showAddModal} handleClose={handleModalClose} handleSubmit={handleAddUnitSubmit} editingUnitSch={focusedUnitSch} />
      <SetRentModal show={showRentModal} handleClose={handleModalClose} handleSubmit={handleSetRentSubmit} editingUnitSch={focusedUnitSch}/>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  areaRents: state.marketplace.areaRents
});


export default connect (mapStateToProps)(UnitSchedule);