import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from "prop-types";



const AddStatusField = ({field, onChangeArray, passIndex, profile, settings}) => {

    const [selected, select] = useState({label: "Lead", value: "lead"});

    let statusOptions = settings.statusOptions;

    const handleSelectChange = (value) => {
        select(value)
    }

    useEffect(() => {
        onChangeArray(field.accessor, selected);
    }, [field.accessor, selected]);

    return (
        <Col lg={12}>
            <Form.Group>
                <label htmlFor={field.name}>{field.name}</label>
                <Select
                    className='selectSingle'
                    name={field.name}
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
    onChangeArray: PropTypes.func.isRequired,
};

export default AddStatusField;
