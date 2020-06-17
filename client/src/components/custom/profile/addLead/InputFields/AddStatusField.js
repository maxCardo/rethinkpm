import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import settings from '../../../../../settings';
import PropTypes from "prop-types";



const AddStatusField = ({field, onChangeArray, passIndex, fieldSettings, profile}) => {
    const theProfiles = settings.routes.profile;

    const [selected, select] = useState({label: "Lead", value: "lead"});

    console.log(fieldSettings);

    const type = fieldSettings[passIndex];

    let statusOptions = theProfiles && theProfiles[profile] && theProfiles[profile]['statusOptions'];

    const handleSelectChange = (value) => {
        select(value)
    }

    useEffect(() => {

        onChangeArray(type.accessor, selected);

    }, [type.accessor, selected]);

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

AddStatusField.propTypes ={
    passIndex: PropTypes.number.isRequired,
    fieldSettings: PropTypes.array.isRequired,
    onChangeArray: PropTypes.func.isRequired,
};

export default AddStatusField;
