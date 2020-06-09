import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';

import {zipcodes} from '../../../BrokerDashboard/AgentList/zipcodes';
import {areas} from '../../../BrokerDashboard/AgentList/areas';


const AddCollectionField = ({field, onChangeArray, passIndex, settings}) => {

    const [selected, select] = useState([])

    const type = settings[passIndex];

    let fieldOptions;
    if (type.datatype === 'zipCodes' || type.datatype === 'targetZipCodes') {
        fieldOptions = zipcodes;
    } else if (type.datatype === 'areas' || type.datatype === 'targetAreas') {
        fieldOptions = areas;
    }

    const handleSelectChange = (value) => {
        select(value);
    }

    useEffect(() => {

        onChangeArray(type.datatype, selected);

    }, [selected]);

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
