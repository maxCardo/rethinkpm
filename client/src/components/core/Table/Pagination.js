import React, { Component } from 'react'

export class Pagination extends Component {
  constructor(props) {
    super(props)
    this.increasePage = this.increasePage.bind(this)
    this.decreasePage = this.decreasePage.bind(this)
  }
  render() {
    const pageItems = this.generatePageItems(this.props.actualIndex, this.props.totalPages)
    return (
      <ul className="pagination" style={{fontSize: this.props.fontSize, display: 'flex', justifyContent: 'center'}}>
        <li className="page-item"><button className={(this.props.actualIndex > 0 ? '' : 'disabled') + " page-link"} onClick={this.props.actualIndex > 0 ? this.decreasePage : null}>Previous</button></li>
        {pageItems}
        <li className="page-item"><button className={(!(this.props.actualIndex + 1 === this.props.totalPages) ? '' : 'disabled') + " page-link"} onClick={!(this.props.actualIndex + 1 === this.props.totalPages) ? this.increasePage : null}>Next</button></li>
      </ul>
    )
  }
  generatePageItems(actualIndex, totalPages) {
    if(totalPages<=14) {
      return (
        [...new Array(totalPages).keys()].map((_, index) => (
          <li className={`page-item ${index === actualIndex ? 'active' : ''}`} key={`page-item-${index}`}><button className="page-link" onClick={this.changePage.bind(this,index)}>{index+1}</button></li>
        ))
      )
    } else if(actualIndex < 11){
      const pageItems = [...new Array(12).keys()].map((_, index) => (
        <li key={index} className={`page-item ${index === actualIndex ? 'active' : ''}`}><button className="page-link" onClick={this.changePage.bind(this,index)}>{index+1}</button></li>
      ))
      pageItems.push(<div key="final..." style={{marginRight:10, marginLeft: 10}}>. . .</div>)
      pageItems.push(<li key="total-2" className={`page-item`}><button className="page-link" onClick={this.changePage.bind(this,totalPages-2)}>{totalPages-1}</button></li>)
      pageItems.push(<li key="total-1" className={`page-item`}><button className="page-link" onClick={this.changePage.bind(this,totalPages-1)}>{totalPages}</button></li>)
      return pageItems
    } else if(actualIndex >= totalPages-12) {
      const pageItems = []
      pageItems.push(<li key="first" className={`page-item`}><button className="page-link" onClick={this.changePage.bind(this,0)}>1</button></li>)
      pageItems.push(<li key="second" className={`page-item`}><button className="page-link" onClick={this.changePage.bind(this,1)}>2</button></li>)
      pageItems.push(<div key="initial..." style={{marginRight:10, marginLeft: 10}}>. . .</div>)
      for(let i= totalPages-12; i<= totalPages; i++) {
        pageItems.push(<li key={i} className={`page-item ${i-1 === actualIndex ? 'active' : ''}`}><button className="page-link" onClick={this.changePage.bind(this,i-1)}>{i}</button></li>)
      }
      return pageItems;
    } else {
      const pageItems = []
      pageItems.push(<li key="first" className={`page-item`}><button className="page-link" onClick={this.changePage.bind(this,0)}>1</button></li>)
      pageItems.push(<li key="second" className={`page-item`}><button className="page-link" onClick={this.changePage.bind(this,1)}>2</button></li>)
      pageItems.push(<div key="initial..." style={{marginRight:10, marginLeft: 10}}>. . .</div>)
      for(let i= 0; i<10; i++) {
        pageItems.push(<li key={i} className={`page-item ${actualIndex-5 + i === actualIndex ? 'active' : ''}`}><button className="page-link" onClick={this.changePage.bind(this,actualIndex-5 + i)}>{actualIndex-4 + i}</button></li>)
      }
      pageItems.push(<div key="final..." style={{marginRight:10, marginLeft: 10}}>. . .</div>)
      pageItems.push(<li key="total-2" className={`page-item`}><button className="page-link" onClick={this.changePage.bind(this,totalPages-2)}>{totalPages-1}</button></li>)
      pageItems.push(<li key="total-1" className={`page-item`}><button className="page-link" onClick={this.changePage.bind(this,totalPages-1)}>{totalPages}</button></li>)
      return pageItems
    }
  }
  changePage(index) {
    this.props.changePage(index)
  }
  decreasePage() {
    this.props.changePage(this.props.actualIndex - 1)
  }
  increasePage() {
    this.props.changePage(this.props.actualIndex + 1)
  }
}

export default Pagination
