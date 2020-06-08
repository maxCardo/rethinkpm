import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';

import {zipcodes} from '../../../BrokerDashboard/AgentList/zipcodes';
import {areas} from '../../../BrokerDashboard/AgentList/areas';


const AddCollectionField = (field) => {

    const [selected, select] = useState(false)

    const type = field.settings[field.passIndex];

    let fieldOptions;
    if (type.datatype === 'zipCodes') {
        fieldOptions = zipcodes;
    } else if (type.datatype === 'areas') {
        fieldOptions = areas;
    }

    const handleSelectChange = (value) => {
        select(value)
    }

    return (
        <Col lg={12}>
            <Form.Group>
                <label htmlFor={type.name}>{type.name}</label>
                <Select
                    className='selectMulti'
                    isMulti={true}
                    name={type.name}
                    value={selected}
                    onChange={handleSelectChange}
                    options={fieldOptions}
                    placeholder='Select...'
                />
            </Form.Group>
        </Col>
    )
}

export default AddCollectionField;
