import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';

const AddCollectionField = ({field, onChangeArray, passIndex, settings, zipcodes, areas}) => {

    const [selected, select] = useState([])
    const profileInfo = settings.profileInfo[passIndex];
    const key = field.key ? field.key : field.accessor

    let fieldOptions = [];
    if ((profileInfo.accessor === 'zipCodes') || (profileInfo.accessor === 'targetZip') || ( profileInfo.accessor === 'desiredZipCodes')) {
        fieldOptions = zipcodes;
    } else if (profileInfo.accessor === 'areas' || profileInfo.accessor === 'targetArea' || profileInfo.accessor === 'desiredAreas') {
        fieldOptions = areas;
    }

    const handleSelectChange = (value) => {
        select(value);
    }

    useEffect(() => {
        onChangeArray(key, selected.map((x) => {return {name: x.value}}))
    }, [selected]);

    return (
        <Col lg={12}>
            <Form.Group>
                <label htmlFor={profileInfo.name}>{profileInfo.name}</label>
                <Select
                    className='selectMulti'
                    isMulti={true}
                    name={profileInfo.name}
                    value={selected}
                    onChange={handleSelectChange}
                    options={fieldOptions}
                    placeholder='Select...'
                />
            </Form.Group>
        </Col>
    )
}

const mapStateToProps = (state) => ({
    zipcodes: state.profile.filterOptions.zip,
    areas: state.profile.filterOptions.area
});

export default connect(mapStateToProps)(AddCollectionField);
