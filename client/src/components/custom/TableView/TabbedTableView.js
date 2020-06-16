import React, { Component } from 'react'
import Table from '../Table'
import {Tabs, Tab} from 'react-bootstrap'
import './style.css'

export class TabbedTableView extends Component {
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
          <Tabs>
            {this.props.states.map(({label, key}, index) => {
              let data = []
              if(key === '*') {
                for(const status in this.props.data) {
                  data = data.concat(this.props.data[status])
                }
              } else if(this.props.data[key]) {
                data = this.props.data[key]
              }
              return (
                <Tab key={key} eventKey={key} title={`Current Selected: ${label}`}>
                  <div className='section'>
                    <h2 className='sectionTitle'>Status {index+1}: {label}</h2>
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
                </Tab>
              )
            })}
          </Tabs>
        </div>
      </div>
    )
  }
}


export default TabbedTableView

