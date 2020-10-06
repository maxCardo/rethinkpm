import React, { Component } from 'react'
import VerticalTable from '../core/VerticalTable/VerticalTable'

const data = {
  "data":{
    "county":{
        "ran":false
    },
    "idx":{
        "ran":true,
        "add":"success",
        "success":true,
        "errorRes":"error running idx 2"
    },
    "walkScore":{
        "ran":false
    },
    "census":{
        "ran":true,
        "success":true
    },
    "rents":{
        "HA":{
          "ran":false
        }
    }
  },
  "images":[
    
  ],
  "_id":"5f1089e337328534946f090c",
  "showings":[
    
  ],
  "UW":[
    
  ],
  "propertyType":"res",
  "listDate":"2020-07-01T04:00:00.000Z",
  "listNumber":"1434995",
  "mlsStatus":"C",
  "lisintgNotes":[
    
  ],
  "__v":5,
  "bathsFull":2,
  "bathsPartial":1,
  "bedrooms":4,
  "city":"Mars",
  "county":"Butler",
  "latitude":40.716991,
  "listPrice":675000,
  "listingAgentID":"209056",
  "listingOfficeID":"15109",
  "longitude":-79.998053,
  "state":"Pennsylvania",
  "streetName":"Hutchman Rd",
  "streetNumber":"295",
  "zipcode":"16046",
  "condition":"4",
  "history":[
    {
        "date":"2020-09-22T10:45:00.373Z",
        "_id":"5f69d5ac6b33e200177fa12e",
        "type":"priceChange",
        "content":"price decrease recorded via daily price decrease api call"
    },
    {
        "date":"2020-09-22T10:45:00.407Z",
        "_id":"5f69d5ac6b33e200177fa131",
        "type":"priceChange",
        "content":"price decrease recorded via daily price decrease api call"
    },
    {
        "date":"2020-09-22T10:45:00.390Z",
        "_id":"5f69d5ac6b33e200177fa12f",
        "type":"priceChange",
        "content":"price decrease recorded via daily price decrease api call"
    },
    {
        "date":"2020-09-22T10:45:00.399Z",
        "_id":"5f69d5ac6b33e200177fa130",
        "type":"priceChange",
        "content":"price decrease recorded via daily price decrease api call"
    }
  ],
  "tract":"9124.02",
  "opZone":false,
  "totalBaths":3
}

const headers = [
  {
    label: 'Tract',
    accessor: 'tract'
  },
  {
    label: 'Bedrooms',
    accessor: 'bedrooms'
  },
  {
    label: 'Ran County',
    accessor: 'data.county.ran'
  },
  {
    label: 'Rent Price',
    computed: true,
    calculate: (data) => ((data.bedrooms*400 + data.bathsFull * 200) / data.condition)  
  },
  {
    label: 'List Date',
    accessor: 'listDate',
    mapper: 'date'
  },
]

export class TestVerticalTable extends Component {
  render() {
    return (
      <div>
        <VerticalTable headers={headers} data={data} />
      </div>
    )
  }
}

export default TestVerticalTable
