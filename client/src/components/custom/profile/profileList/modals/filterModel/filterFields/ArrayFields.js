import React, {Fragment, useState, useRef, useLayoutEffect} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap'


const ArrayFields = ({filterFields, onChange, prop, options}) => {

    const [state, setState] = useState(filterFields)
    const {name, type, value, dataType} = filterFields
    const selectInput = useRef(null);

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

    useLayoutEffect(() => {
        (state.type.value !== 'noFilter' && state.value.length === 0) && selectInput.current.focus();
        console.log(selectInput);
    });

    console.log(state);
    return (
        <Fragment>
            <Col xs={12} className="filter-row">
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
                                className={(state.type.value === 'noFilter') && 'disabled'}
                                placeholder={`Select ${name}...`}
                                isMulti
                                options={options[prop]}
                                value={value}
                                onChange={value => callChange(`value`, value)}
                                isDisabled={(state.type.value === 'noFilter')}
                                ref={selectInput}
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
