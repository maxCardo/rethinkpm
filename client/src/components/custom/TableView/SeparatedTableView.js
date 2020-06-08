import React, { Component } from 'react'
import Table from '../Table'
import './style.css'

export class SeparatedTableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterString: '',
    }
  }
  render() {
    return (
      <div>
        <div className='searchContainer'>
          <input className='form-control searchInput' tabIndex={0} onChange={(e) => this.setState({filterString: e.target.value})} placeholder='Search'></input>
        </div>
        <div className="container-fluid" style={{overflow: 'auto', maxHeight: '80vh'}}>
          {this.props.states.map(({label, key}, index) => (
            <div key={key}>
              <h2 className='sectionTitle'>Status {index+1}: {label}</h2>
              <Table
                pageSize={10}
                sorting={true}
                filter={this.state.filterString}
                fontSize={12}
                className="agentInfoTable"
                {...this.props}
                data={this.props.data[key] ? this.props.data[key] : []}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}


export default SeparatedTableView

