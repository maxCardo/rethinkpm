import React from 'react';
import {formatMoney, filterData, accessData} from '../../../../../util/commonFunctions'

import { Form, Col } from 'react-bootstrap';


const TextField = ({field, data, onChange}) => {

    return (
        <Col lg={12}>
            <Form.Group>
                <Form.Label htmlFor={field.name}>{field.name}:</Form.Label>
                <Form.Control name={field.accessor} type="text" placeholder={'Enter ' + field.name} onChange={(e) => onChange(e)}/>
            </Form.Group>
        </Col>
    )
}


export default TextField