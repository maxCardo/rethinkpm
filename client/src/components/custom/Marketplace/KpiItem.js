import React, { Component } from 'react'

export class KpiItem extends Component {
  constructor(props) {
    super(props);
    this.variation = Math.random() > 0.5 ? 6 : -5
  }
  render() {
    let variationBlock;
    if(this.variation > 0) {
      variationBlock = (
        <span className='kpi-item__variation kpi-item__positive-variation'>
          <i class="fas fa-long-arrow-alt-up"></i>
          {this.variation}%
        </span>
      )
    } else if(this.variation < 0) {
      variationBlock = (
        <span className='kpi-item__variation kpi-item__negative-variation'>
          <i class="fas fa-long-arrow-alt-down"></i>
          {this.variation * -1}%
        </span>
      )
    } else {
      variationBlock = (
        <span className='kpi-item__variation'>
          <i class="fas fa-long-arrow-alt-right"></i>
          {this.variation}%
        </span>
      )
    }
    return (
      <div className='kpi-item__container'>
        <p className='kpi-item__number'>
          1234
          {variationBlock}
        </p>
        <p className='kpi-item__title'>{this.props.title}</p>
      </div>
    )
  }
}

export default KpiItem
