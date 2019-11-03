import React, { Component } from 'react'

export class Properties extends Component {
  constructor(props) {
    super(props)

    this.state = {
      propertiesChecked: this.props.properties.slice()
    }
    this.props.onChangePropertiesFilter(this.props.properties.slice())

  }
  render() {
    return (
      <ul className='list-group propertyList'>
        {this.props.properties.map((property, index) => (
          <li className='list-group-item'>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                value={property} 
                id="defaultCheck1"
                checked={this.state.propertiesChecked.includes(property)} 
                onChange={this.onChange.bind(this)}
              />
              <label className="form-check-label" for="defaultCheck1">
                {property}
              </label>
            </div>
          </li>
        ))}
      </ul>
    )
  }
  onChange(e) {
    const property = e.target.value
    const checked = e.target.checked
    const propertiesChecked = this.state.propertiesChecked.slice()
    if(!checked) {
      var index = propertiesChecked.indexOf(property);
      if (index !== -1) propertiesChecked.splice(index, 1);
    } else {
      propertiesChecked.push(property)
    }
    this.setState({propertiesChecked})
    this.props.onChangePropertiesFilter(propertiesChecked)
  }
}

export default Properties
