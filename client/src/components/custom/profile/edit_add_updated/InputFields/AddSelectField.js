import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import settings from '../../../../../settings';



const AddSelectField = ({field, onChangeArray, passIndex, fieldSettings, profile, offices}) => {
    const theProfiles = settings.routes.profile;

    console.log(offices);

    const [selected, select] = useState(false)

    let officeOptions = theProfiles && theProfiles[profile] && offices;

    const handleSelectChange = (value) => {
        select(value)
    }

    useEffect(() => {

        onChangeArray(field.accessor, selected);

    }, [selected, field.accessor, onChangeArray]);

    return (
        <Col lg={12}>
            <Form.Group>
                <label htmlFor={field.name}>{field.name}</label>
                <Select
                    className='selectSingle'
                    name={field.name}
                    value={selected}
                    onChange={handleSelectChange}
                    options={officeOptions}
                    placeholder='Select...'
                />
            </Form.Group>
        </Col>
    )
}

function mapStateToProps(state) {
    const offices = state.profile.filterOptions.office;
    return { offices }
}

export default connect(mapStateToProps)(AddSelectField);
