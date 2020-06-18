import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';

const AddCollectionField = ({field, onChangeArray, passIndex, settings, zipcodes, areas}) => {

    console.log(zipcodes);

    const [selected, select] = useState([])


    let fieldOptions = [];
    if ((settings[passIndex].accessor === 'zipCodes') || (settings[passIndex].accessor === 'targetZipCodes') || ( settings[passIndex].accessor === 'desiredZipCodes')) {
        fieldOptions = zipcodes;
    } else if (settings[passIndex].accessor === 'areas' || settings[passIndex].accessor === 'targetAreas' || settings[passIndex].accessor === 'desiredAreas') {
        fieldOptions = areas;
    }

    const handleSelectChange = (value) => {
        select(value);
    }

    useEffect(() => {


        onChangeArray(settings[passIndex].accessor, selected);

    }, [settings, passIndex, selected]);

    return (
        <Col lg={12}>
            <Form.Group>
                <label htmlFor={settings[passIndex].name}>{settings[passIndex].name}</label>
                <Select
                    className='selectMulti'
                    isMulti={true}
                    name={settings[passIndex].name}
                    value={selected}
                    onChange={handleSelectChange}
                    options={fieldOptions}
                    placeholder='Select...'
                />
            </Form.Group>
        </Col>
    )
}

function mapStateToProps(state) {
    const zipcodes = state.profile.filterOptions.zip;
    const areas = state.profile.filterOptions.area;
}

export default connect(mapStateToProps)(AddCollectionField);
