import React , {Fragment, useState} from 'react'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap';

const NumberFields = ({ filterFields, onChange, prop }) => {

    const [state, setState] = useState(filterFields)
    const { name, type, value, secondValue } = filterFields

    const callChange = (property, value) => {
        setState((prevState) => {
            const newState = Object.assign({}, prevState)
            newState[property] = value
            onChange(prop, newState)
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

    return (
        <Fragment>
            <Col xs={12}>
                <Form.Group>
                    <Form.Label>{name}</Form.Label>
                    <Row>
                        <Col xs={3}>
                            <Select
                                options={numberFilters}
                                value={type}
                                onChange={value => callChange('type', value)}
                            />
                        </Col>
                        {type && type.value === 'range' ? (
                            <Fragment>
                                <Col xs={4}>
                                    <Form.Control
                                        type='text'
                                        value={value}
                                        onChange={e => callChange('value', e.target.value)}
                                    />
                                </Col>
                                <Col xs={1}>TO</Col>
                                <Col xs={4}>
                                    <Form.Control
                                        type='text'
                                        value={secondValue}
                                        onChange={e => callChange('secondValue', e.target.value)}
                                    />
                                </Col>
                            </Fragment>
                        ) : (
                                <Col xs={9}>
                                    <Form.Control
                                        type='text'
                                        value={value}
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