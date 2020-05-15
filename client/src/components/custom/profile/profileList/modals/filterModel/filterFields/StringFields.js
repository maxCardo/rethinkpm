import React ,{Fragment, useState} from 'react'
import Select from 'react-select'
import { Form, Row, Col } from 'react-bootstrap';

const StringFields = ({ filterFields, onChange, prop }) => {


    const [state, setState] = useState(filterFields)
    const { name, type, value } = filterFields

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



    return (
        <Fragment>
            <Col xs={12}>
                <Form.Group>
                    <Form.Label>{name}</Form.Label>
                    <Row>
                        <Col xs={3}>
                            <Select
                                options={stringFilters}
                                value={type}
                                onChange={value => callChange('type', value)}
                            />
                        </Col>
                        <Col xs={9}>
                            <Form.Control
                                type='text'
                                value={value}
                                onChange={e => callChange('value', e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>
            </Col>
        </Fragment>
    )
}

export default StringFields