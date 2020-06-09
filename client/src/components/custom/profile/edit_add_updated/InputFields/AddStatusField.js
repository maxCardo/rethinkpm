import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import settings from '../../../../../settings';



const AddStatusField = ({field, onChangeArray, passIndex, fieldSettings, profile}) => {
    const theProfiles = settings.routes.profile;
    console.log(profile);
    console.log(fieldSettings)

    const [selected, select] = useState(false)

    const type = fieldSettings[passIndex];

    let statusOptions = theProfiles && theProfiles[profile] && theProfiles[profile]['statusOptions'];

    const handleSelectChange = (value) => {
        select(value)
    }

    useEffect(() => {

        onChangeArray(type.accessor, selected);

    }, [selected]);

    return (
        <Col lg={12}>
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
