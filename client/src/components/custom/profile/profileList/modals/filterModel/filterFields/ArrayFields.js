import React, {Fragment, useState, useRef, useLayoutEffect} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap'


const ArrayFields = ({filterFields, onChange, prop, options}) => {

    const [state, setState] = useState(filterFields)
    const [useFilter, setUseFilter] = useState(false);
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

    const checkBoxCheck = (
        <svg viewBox="0 0 21 21">
            <path
                d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
        </svg>
    );

    const onCheckSelect = (e) => {
        setUseFilter(!useFilter);
        if (useFilter === true) {
            callChange('type', {label: "Don't filter", value: "noFilter"})
        } else {
            callChange('type', {label: "In", value: 'in'})
        }
        console.log(useFilter);
    }

    console.log(state);
    return (
        <Fragment>
            <Col xs={12} className="filter-row">
                <Form.Group>
                    <Form.Label>{name}</Form.Label>
                    <Row>
                        <Col xs={3}>
                            <Form.Group>
                                <div className="element-wrapper with--checkbox">
                                    <label className="checkbox path" checked={true}  >
                                        <input type="checkbox" name='useFilter' value={useFilter} onChange={e => onCheckSelect(e)}/>
                                        {checkBoxCheck} &nbsp; Filter
                                    </label>
                                </div>
                            </Form.Group>
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
