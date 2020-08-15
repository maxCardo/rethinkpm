import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from '../../core/Table'
import Loading from '../../core/LoadingScreen/Loading';
import './style.css'
import KpiBar from './KpiBar';

const HEADERS = [
  {
    accessor: "propertyType",
    label: "Type"
  },
  {
    accessor: "county",
    label: "Area"
  },
  {
    accessor: "streetName",
    label: "Address"
  },
  {
    accessor: 'listPrice',
    label: 'List Price',
    mapper: 'money'
  },
  {
    accessor: 'bedrooms',
    label: 'Bedrooms'
  },
  {
    accessor: 'bathsFull',
    label: 'Full Bath'
  },
  {
    accessor: 'bathsPartial',
    label: 'Partial Bath'
  },
  {
    reactComponent: true,
    label: 'Actions',
    render: (item) => (
      <div>
        <a className='marketplace__table-icon' href={`http://cardo.idxbroker.com/idx/details/listing/d504/${item.listNumber}`} target= "_blank">
          <i class="fas fa-link"></i>
        </a>
        <a className='marketplace__table-icon'>
          <i class="fas fa-plus"></i>
        </a>
        <a className='marketplace__table-icon'>
          <i class="fas fa-check"></i>
        </a>
        <a className='marketplace__table-icon'>
          <i class="fas fa-adjust"></i>
        </a>
        <a className='marketplace__table-icon'>
          <i class="fas fa-times"></i>
        </a>
      </div>
    )
  }
]

const Marketplace = () => {
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [filterString, setFilterString] = useState('')

  const fetchData = async () => {
    setLoading(true)
    const res = await axios.get(`/api/sales/listings`);
    const listings = res.data;
    setListings(listings)
    setLoading(false)
  }

  useEffect(async () => {
    fetchData()
  },[])

  return loading ? <Loading /> : (
    <div>
      <KpiBar />
      <div className='searchContainer agentsSearchContainer'>
        <input 
          className='form-control searchInput' 
          tabIndex={0}
          onChange={(e) => setFilterString(e.target.value)} 
          placeholder='Search' 
        />
      </div>
      <div className="container-fluid" style={{overflow: 'auto', maxHeight: '80vh'}}>
        <div className="col-12" >
          <Table 
            pageSize={10}
            sorting={true}
            fontSize={12}
            filter={filterString}
            data={listings}
            headers={HEADERS}
          />
        </div>
      </div>
    </div>
  )
}

export default Marketplace
