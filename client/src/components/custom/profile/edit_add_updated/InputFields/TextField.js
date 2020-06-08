import React from 'react';
import {formatMoney, filterData, accessData} from '../../../../../util/commonFunctions'

import { Form, Col } from 'react-bootstrap';


const TextField = ({field, data}) => {

    return (
        <Col lg={12}>
            <Form.Group>
                <Form.Label htmlFor={field.name}>{field.name}:</Form.Label>
                <Form.Control type="text" placeholder={'Enter ' + field.name}/>
            </Form.Group>
        </Col>
    )
}


export default TextField