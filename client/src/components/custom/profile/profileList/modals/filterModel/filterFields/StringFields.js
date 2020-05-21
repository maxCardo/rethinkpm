import React, {Fragment, useLayoutEffect, useRef, useState} from 'react'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap';
import {checkBoxCheck} from '../../../../../../../util/commonFunctions';

const StringFields = ({ filterFields, onChange, prop }) => {


    const [state, setState] = useState(filterFields)
    const [useFilter, setUseFilter] = useState(false)
    const { name, type, value } = filterFields
    const input = useRef(null);

    const callChange = (property, value) => {
        setState((prevState) => {
            const newState = Object.assign({}, prevState)
            newState[property] = value
            onChange(prop, newState)
            return newState
        })
    }

    const stringFilters = [
        { label: "Don't filter", value: 'noFilter' },
        { label: '==', value: '==', operator: '$eq' },
        { label: 'includes', value: 'includes' },
    ];

    useLayoutEffect(() => {
        (state.type.value !== 'noFilter' && state.value.length === 0) && input.current.focus();
    });

    const onCheck = (e) => {
        setUseFilter(!useFilter);
        if (useFilter === true) {
            callChange('type', {label: "Don't filter", value: "noFilter"})
        } else {
            callChange('type', {label: "==", value: "==", operator: "$eq"})
        }
    }

    return (
        <Fragment>
            <Col xs={12}>
                <Form.Group className="stringField__group">
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
                            <Form.Control
                                type='text'
                                value={value}
                                onChange={e => callChange('value', e.target.value)}
                                ref={input}
                                disabled={(state.type.value === 'noFilter')}
                            />
                        </Col>
                    </Row>
                </Form.Group>
            </Col>
        </Fragment>
    )
}

export default StringFields