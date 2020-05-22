import React, {Fragment, useState, useRef, useLayoutEffect} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap'
import {checkBoxCheck} from '../../../../../../../util/commonFunctions';


const ArrayFields = ({orderKey, filterFields, onChange, prop, options}) => {

    const [state, setState] = useState(filterFields)
    const [useFilter, setUseFilter] = useState(false)
    const {name, value} = filterFields
    const selectInput = useRef(null);

    const callChange = (property, value) => {
        setState((prevState) => {
        const newState = Object.assign({}, prevState)
        newState[property] = value
        onChange(prop, newState)
        return newState
      })      
    }

    useLayoutEffect(() => {
        console.log(state.value);
        (state.type.value && (state.type.value !== 'noFilter') && (state.value === '' || state.value === null)) && selectInput.current.focus();
    });

    const onCheck = (e) => {
        setUseFilter(!useFilter);
        if (useFilter === true) {
            callChange('type', {label: "Don't filter", value: "noFilter"})
            callChange('value', [])
        } else {
            callChange('type', {label: "In", value: "in", operator: "$in"})
        }
    }

    return (
        <Fragment>
            <Col xs={12} className="filter-row" style={{order: `${100 - orderKey}`}}
            >
                <Form.Group>
                    <Form.Label>{name}</Form.Label>
                    <Row>
                        <Col xs={3}>
                            <Form.Group>
                                <div className="element-wrapper with--checkbox">
                                    <label className="checkbox path" checked={true}  >
                                        <input type="checkbox" name='useFilter' value={useFilter} onChange={e => onCheck(e)}/>
                                        {checkBoxCheck()} &nbsp; Use Filter
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
