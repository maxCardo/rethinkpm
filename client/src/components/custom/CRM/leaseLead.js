import React, {useEffect, useState} from 'react'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import IconButton from "../../core/IconButton/IconButton";
import Table from '../../core/newTable/_Table'
import Loading from '../../core/LoadingScreen/Loading';

import {getLeaseLeadData} from '../../../actions/crm/leaseLeads'
import leaseLeads from '../../../reducers/leaseLeads';


const LeaseLeadRecords = ({getLeaseLeadData, leaseLeads: {list, loading}}) => {

  //---------- Data Maps --------------//
  const headers = [
    {
      accessor: "fullName",
      label: "Name"
    },
    {
      accessor: "leadSource",
      label: "Source"
    },
    // {
    //   reactComponent: true,
    //   label: "Address",
    //   render: (item) => (
    //       <div>
    //         <p>{item.deal_id.streetNumber} {item.deal_id.streetName}</p>
    //       </div>
    //   ),
    //   className: "Marketplace__address"
    // },
    // {
    //   label: 'Zip',
    //   accessor: 'deal_id.zipcode'
    // },
    // {
    //   accessor: 'deal_id.bedrooms',
    //   label: 'Bed'
    // },
    // {
    //   accessor: 'deal_id.totalBaths',
    //   label: 'Bath'
    // },
    // {
    //   reactComponent: true,
    //   label: 'Actions',
    //   className: "Marketplace__actions",
    //   render: (item) => (
    //       <div style={{display: 'flex'}}>
    //         <IconButton placement='bottom'
    //                     tooltipContent='View property details'
    //                     id='property-details-tooltip'
    //                     iconClass='fas fa-list'
    //                     variant='action-button'
    //                     onClickFunc={() => {
    //                       setIframeTarget(`https://fifthgrant.idxbroker.com/idx/details/listing/d504/${item.deal_id.listNumber}`);
    //                       setShowPropertyDetailsModal(true);
    //                     }}
    //         />
    //         {/* <IconButton placement='bottom'
    //                     tooltipContent='View On Site'
    //                     id='link-tooltip'
    //                     iconClass='fas fa-link'
    //                     variant='link'
    //                     href={`https://fifthgrant.idxbroker.com/idx/details/listing/d504/${item.listNumber}`}
    //         /> */}
            
    //         <IconButton placement='bottom'
    //                     tooltipContent='Input Appointment'
    //                     iconClass='fas fa-calendar'
    //                     variant='action-button'
    //                     onClickFunc={() => {
    //                       setFocusedProperty(item.deal_id)
    //                       setShowSchModal(true)
    //                     }}
    //         />
    //         {/* <IconButton placement='bottom'
    //                     tooltipContent='Recommend Deal'
    //                     iconClass='fas fa-star'
    //                     variant='action-button'
    //                     //onClickFunc={() => startRecommendationFlow([item])}
    //         /> */}
    //         <IconButton placement='bottom'
    //                     tooltipContent='Blacklist Deal'
    //                     iconClass='fas fa-trash'
    //                     variant='action-button'
    //                     btnClass='text-danger'
    //                     //needsConfirmation={true}
    //                     onClickFunc={() => unflag(item._id)}
    //         />
    //       </div>
    //   )
    // }
  ]

  //--- Bug Fix for filter Select CSS with Sticky Header ---//
  const [sticky, setSticky] = useState(true)
 
  
  // useEffect(() => {
  //   setSticky(true)
  // },[]) //run when main data filed is updated

  useEffect(() => {
    getLeaseLeadData();
  }, []);
  

 return loading ? (
  <Loading />
 ) : (
    <div>
      <div>
        Leasing Leads
      </div>   
      
        <Table
        headers={headers}
        list = {list}
        // handleClickRow={}
        sticky = {sticky}
        />
    </div>
  )
}

const mapStateToProps = state => ({
  leaseLeads: state.leaseLeads
})


export default connect(mapStateToProps, {getLeaseLeadData})(LeaseLeadRecords)

