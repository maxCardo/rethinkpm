import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import PropTypes from "prop-types";



const AddSelectField = ({field, onChangeArray, offices}) => {

    const [selected, select] = useState(null);
    const options = field.name === 'Office' ? offices : field.dataOptions

 
    const handleSelectChange = (value) => {
        select(value);
        onChangeArray(field.accessor, selected);
    };

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
                    options={options}
                    placeholder='Select...'
                />
            </Form.Group>
        </Col>
    )
}

const  mapStateToProps = state =>  ({
    offices: state.profile.filterOptions.office
})

AddSelectField.propTypes ={
    field: PropTypes.object.isRequired,
    onChangeArray: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AddSelectField);
