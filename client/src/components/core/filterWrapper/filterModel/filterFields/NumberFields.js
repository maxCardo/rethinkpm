/* eslint-disable */
import React , {Fragment, useState, useEffect} from 'react'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap';
import {checkBoxCheck} from '../../../../../utilities/commonFunctions'


const NumberFields = ({ filterFields, onChange, prop, orderKey }) => {
    const [state, setState] = useState(filterFields)
    const [useFilter, setUseFilter] = useState(false)
    const { name, type, value, secondValue } = filterFields

    useEffect(() => {
      onChange(prop, state)
    }, [state])

    const callChange = (property, value) => {
        setState((prevState) => {
            const newState = Object.assign({}, prevState)
            newState[property] = value
            return newState
        })
    }

    const numberFilters = [
        { label: "Don't filter", value: 'noFilter' },
        { label: 'range', value: 'range', operator: ['$gte', '$lte'] },
        { label: '==', value: '==', operator: '$eq' },
        { label: '!=', value: '!=', operator: '$ne' },
        { label: '>', value: '>', operator: '$gt' },
        { label: '>=', value: '>=', operator: '$gte' },
        { label: '<', value: '<', operator: '$lt' },
        { label: '<=', value: '<=', operator: '$lte' },
    ];

    const onCheck = (e) => {
        setUseFilter(!useFilter);
    }

    return (
        <Fragment>
            <Col xs={12} style={{order: `${100 - orderKey}`}}>
                <Form.Group className='numberField__group'>
                    <Form.Label>{name}</Form.Label>
                    <Row>
                        <Col xs={3}>
                            <Form.Group>
                                <div className="element-wrapper with--checkbox">
                                    <label className="checkbox path">
                                        <input type="checkbox" name='useFilter' value={useFilter} onChange={e => onCheck(e)}/>
                                        {checkBoxCheck()} &nbsp; Use Filter
                                    </label>
                                </div>
                            </Form.Group>
                        </Col>
                        {useFilter &&
                        <Col xs={type && type.value === 'range' ? 2 : 3}>
                            <Select
                                isSearchable={false}
                                options={numberFilters}
                                value={type}
                                onChange={value => callChange('type', value)}
                            />
                        </Col>}
                        {useFilter && type && type.value === 'range' ? (
                            <Fragment>
                                <Col xs={3}>
                                    <Form.Control
                                        type='text'
                                        value={value}
                                        onChange={e => callChange('value', e.target.value)}
                                    />
                                </Col>
                                <Col xs={1}>TO</Col>
                                <Col xs={3}>
                                    <Form.Control
                                        type='text'
                                        value={secondValue}
                                        onChange={e => callChange('secondValue', e.target.value)}
                                    />
                                </Col>
                            </Fragment>
                        ) : (
                                <Col xs={useFilter ? 6 : 9} >
                                    <Form.Control
                                        type='text'
                                        value={value}
                                        disabled={!useFilter}
                                        onChange={e => callChange('value', e.target.value)}
                                    />
                                </Col>
                            )}
                    </Row>
                </Form.Group>
            </Col>
        </Fragment>
    )
}

export default NumberFields