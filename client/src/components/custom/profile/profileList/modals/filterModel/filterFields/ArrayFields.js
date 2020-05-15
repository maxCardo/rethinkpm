import React , {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap'


const ArrayFields = ({filterFields, onChange, prop, options}) => {

    const [state, setState] = useState(filterFields)
    const {name, type, value, dataType} = filterFields

    const callChange = (property, value) => {
        setState((prevState) => {
        const newState = Object.assign({}, prevState)
        newState[property] = value
        onChange(prop, newState)
        return newState
      })      
    }
    

    const arrayFilters = [
        { label: "Don't filter", value: 'noFilter' },
        { label: 'in', value: 'in', operator: '$in' },
        { label: 'out', value: 'out', operator: '$nin' },
    ];

    const officeOptions = [
        { value: '13401', label: 'testOffce' },
        { value: '15155', label: 'testOffice2' },
    ];

    
    
    return (
        <Fragment>
            <Col xs={12}>
                <Form.Group>
                    <Form.Label>{name}</Form.Label>
                    <Row>
                        <Col xs={3}>
                            <Select
                                options={arrayFilters}
                                value={type}
                                onChange={value => callChange('type', value)}
                            />
                        </Col>
                        <Col xs={9}>
                            <Select
                                isMulti
                                options={options[prop]}
                                value={value}
                                onChange={value => callChange(`value`, value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>
            </Col>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    options: state.profile.filterOptions
});

export default connect(mapStateToProps)(ArrayFields)
