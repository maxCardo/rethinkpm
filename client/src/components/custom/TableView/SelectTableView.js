import React, {Component} from 'react'

import Table from '../Table'
import Select from 'react-select';

export class SelectTableView extends Component {
  constructor(props) {
    super(props)
    const selectOptions = this.props.states.map(({label, key}, index) => ({
      label: `Current Selected: ${label}`,
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
    let data = []
    if(this.state.statusSelected.value === '*') {
      for(const status in this.props.data) {
        data = data.concat(this.props.data[status])
      }
    } else if(this.props.data[this.state.statusSelected.value]) {
      data = this.props.data[this.state.statusSelected.value]
    }
    return (
      <div>
        <div className='searchContainer agentsSearchContainer'>
          <Select
            className="table-view__select"
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
        <div className="container-fluid" style={{overflow: 'auto', maxHeight: '80vh'}}>
          <div className="col-12" >
            <Table
              pageSize={10}
              sorting={true}
              filter={this.state.filterString}
              fontSize={12}
              className="agentInfoTable"
              {...this.props}
              data={data}
            />
          </div>
        </div>
      </div>
    )
  }
}


export default SelectTableView

