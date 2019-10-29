import React, { Component } from 'react'

export class Properties extends Component {
  constructor(props) {
    super(props)
    this.properties = [
      'Mayert-Ernser',
      'Schuppe Group',
      'McDermott-Moen',
      'Terry-Pfannerstill',
      'Cruickshank and Sons',
      'Gerhold, Yost and Harvey'
    ]

    this.state = {
      propertiesChecked: this.properties.slice()
    }
    this.props.onChangePropertiesFilter(this.properties.slice())

  }
  render() {
    return (
      <ul className='list-group propertyList'>
        {this.properties.map((property, index) => (
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
    console.log(propertiesChecked)
  }
}

export default Properties
