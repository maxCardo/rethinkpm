import React, { useState } from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import PropTypes from "prop-types";



const AddSelectField = ({field, onChangeArray, offices, rentalListings}) => {

    const [selected, select] = useState(null);
    const options = field.name === 'Office' ? offices : field.name ==='Property'? rentalListings : field.dataOptions
    const key = field.key ? field.key: field.accessor

 
    const handleSelectChange = (value) => {
        select(value);
        onChangeArray(key, value.value);
    };

    return (
        <Col lg={12}>
            <Form.Group>
                <label htmlFor={field.name}>{field.name}</label>
                <Select
                    className='selectSingle'
                    name={field.name}
                    value={selected}
                    onChange={(e) => handleSelectChange(e)}
                    options={options}
                    placeholder='Select...'
                />
            </Form.Group>
        </Col>
    )
}

const  mapStateToProps = state =>  ({
    offices: state.profile.filterOptions.office,
    rentalListings: state.profile.filterOptions.rentalListings
})

AddSelectField.propTypes ={
    field: PropTypes.object.isRequired,
    onChangeArray: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AddSelectField);
