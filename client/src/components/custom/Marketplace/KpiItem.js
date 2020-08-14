import React, { Component } from 'react'
import axios from 'axios'

export class KpiItem extends Component {
  constructor(props) {
    super(props);
    this.variation = Math.random() > 0.5 ? 6 : -5
    this.state = {}
  }
  componentDidMount() {
    this.fetchData()
  }
  async fetchData() {
    const response = await axios.get(this.props.endpoint)
    const {actualNumber, porcentualChange} = response.data
    this.setState({actualNumber, porcentualChange})
  }
  render() {
    let variationBlock;
    if(this.state.porcentualChange > 0) {
      variationBlock = (
        <span className='kpi-item__variation kpi-item__positive-variation'>
          <i class="fas fa-long-arrow-alt-up"></i>
          {this.state.porcentualChange}%
        </span>
      )
    } else if(this.state.porcentualChange < 0) {
      variationBlock = (
        <span className='kpi-item__variation kpi-item__negative-variation'>
          <i class="fas fa-long-arrow-alt-down"></i>
          {this.state.porcentualChange * -1}%
        </span>
      )
    } else {
      variationBlock = (
        <span className='kpi-item__variation'>
          <i class="fas fa-long-arrow-alt-right"></i>
          {this.porcentualChange}%
        </span>
      )
    }
    return (
      <div className='kpi-item__container'>
        <p className='kpi-item__number'>
          {this.state.actualNumber}
          {variationBlock}
        </p>
        <p className='kpi-item__title'>{this.props.title}</p>
      </div>
    )
  }
}

export default KpiItem
