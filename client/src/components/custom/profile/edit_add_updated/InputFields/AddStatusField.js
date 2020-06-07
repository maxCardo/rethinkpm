import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import settings from '../../../../../settings';



const AddStatusField = (field) => {
console.log(field.profile);
    const theProfiles = settings.routes.profile;

    const [selected, select] = useState(false)

    const type = field.settings[field.passIndex];

    let statusOptions = theProfiles && theProfiles[field.profile] && theProfiles[field.profile]['statusOptions'];

    const handleSelectChange = (value) => {
        select(value)
    }

    return (
        <Col lg={4}>
            <Form.Group>
                <label htmlFor={type.name}>{type.name}</label>
                <Select
                    className='selectSingle'
                    name={type.name}
                    value={selected}
                    onChange={handleSelectChange}
                    options={statusOptions}
                    placeholder='Select...'
                />
            </Form.Group>
        </Col>
    )
}

export default AddStatusField;
