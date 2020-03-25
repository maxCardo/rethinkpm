import React, { Component } from 'react'
import Table from '../../Table'
import './screens.css'

export class BillingScreen extends Component {
  constructor(props) {
    super(props)
    this.data = [
      {
        date: new Date,
        type: 'charge',
        account: 'services',
        no: '',
        memo: 'labor',
        decrease: '$500',
        balance: '$100'
      },
      {
        date: new Date,
        type: 'payment',
        account: 'services',
        no: '',
        memo: 'owner payment',
        increase: '$900',
        balance: '$600'
      },
      {
        date: new Date,
        type: 'charge',
        account: 'services',
        no: '',
        memo: 'supplies',
        decrease: '$300',
        balance: '$-300'
      },

    ];
    this.headers = [
      {
        accessor: 'date',
        label: 'Date',
        mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
      },
      {
        accessor: 'type',
        label: 'Type'
      },
      {
        accessor: 'account',
        label: 'Account'
      },
      {
        accessor: 'no',
        label: 'NO.'
      },
      {
        accessor: 'memo',
        label: 'Memo',
      },
      {
        accessor: 'increase',
        label: 'Increase',
        mapper: this.increaseDecreaseMapper,
      },
      {
        accessor: 'decrease',
        label: 'Decrease',
        mapper: this.increaseDecreaseMapper,
      },
      {
        accessor: 'balance',
        label: 'Balance',
      }
    ];
  }
  render() {
    return (
      <div className='billing-screen__container'>
        <Table 
          data={this.data}
          headers={this.headers}
          fontSize={12}
          pageSize={5}
        />
      </div>
    )
  }
  increaseDecreaseMapper(data) {
    return data && data != 'undefined' ? data : '-'
  }
}

export default BillingScreen
