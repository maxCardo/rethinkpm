import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import {checkBoxCheck, validateEmail} from "../../../../../util/commonFunctions";


const AddEmailField = ({field, form, onChangeArray}) => {

    const [valid, setValid] = useState(false);
    const [address, setAddress] = useState('');
    const [formData, setFormData] = useState({});

    const onChange = e => {
        setAddress(e.target.value);
        let newFormData = {[e.target.name]: e.target.value};
        setFormData({ ...formData, ...newFormData });
        validate(e);
    };

    const validate = (e) => {
        e && setValid(validateEmail(e.target.value))
    }

    const onCheckChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.checked});
    }

    useEffect(() => {

        onChangeArray(field.accessor, formData);

    }, [formData]);

    const checkBox = checkBoxCheck();

    return (
        <Col lg={12}>
            <Form.Group className="addEmailGroup">
                <Form.Group>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type="text" name='address'
                                  className={valid ? 'valid' : 'invalid'}
                                  placeholder='Enter Email Address'
                                  value={address}
                                  onChange={(e) => {
                                      onChange(e);
                                  }}
                                  autoFocus={true} />
                </Form.Group>
                <Form.Group>
                    <div className="element-wrapper with--checkbox">
                        <label className="checkbox path"   >
                            <input type="checkbox" name='isPrimary' onChange={(e) => onCheckChange(e)}/>
                            {checkBox} &nbsp; Primary
                        </label>
                    </div>
                </Form.Group>
            </Form.Group>
        </Col>
    )
}

export default AddEmailField;
