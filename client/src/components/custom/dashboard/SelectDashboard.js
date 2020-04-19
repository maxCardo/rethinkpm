import React, {Component} from 'react'

import Table from '../Table'
import Select from 'react-select';

export class SelectDashboard extends Component {
  constructor(props) {
    super(props)
    const selectOptions = this.props.states.map(({label, key}, index) => ({
      label: `Status ${index+1}: ${label}`,
      value: key
    }))
    this.state = {
      data: [],
      filterString: '',
      selectOptions,
      statusSelected: selectOptions[0]
    }
  }

  render() {
    return (
      <div>
        <div className='searchContainer agentsSearchContainer'>
          <Select
            className="agentStatusFilter"
            onChange={(value) => this.setState({ statusSelected: value })}
            defaultValue={this.state.statusSelected}
            options={this.state.selectOptions}
          />
          <input 
            className='form-control searchInput' 
            tabIndex={0}
            onChange={(e) => this.setState({filterString: e.target.value})} 
            placeholder='Search' 
          />
        </div>
        <div className="container-fluid " style={{overflow: 'auto', maxHeight: '80vh'}}>
          <div className="col-12" >
            <Table
              headers={this.props.headers}
              data={this.props.data[this.state.statusSelected.value]}
              pageSize={10}
              sorting={true}
              sortBy={this.props.sortBy}
              sortDirection={this.props.sortDirection}
              filter={this.state.filterString}
              fontSize={12}
              onClickRow={this.props.handleClickRow}
              className="agentInfoTable"
              loading={this.props.loading}
            />
          </div>
        </div>
      </div>
    )
  }
}


export default SelectDashboard

