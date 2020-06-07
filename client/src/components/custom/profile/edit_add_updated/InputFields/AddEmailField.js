import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import {checkBoxCheck} from "../../../../../util/commonFunctions";


const AddEmailField = (field, form) => {

    const trueFalse = [
        {value: "true", label: 'Yes'},
        {value: "false", label: 'No'}
    ];

    const [valid, validate] = useState(false);
    const [address, setAddress] = useState('');
    const [isPrimary, setIsPrimary] = useState(true);
    const [formData, setFormData] = useState(form);

    const onChange = e => {
        setIsPrimary(!isPrimary);
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const checkBox = checkBoxCheck();

    return (
        <Col lg={6}>
            <Form.Group className="addPhoneGroup">
                <Form.Group>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type="text" name='address'
                                  className={valid ? 'valid' : 'invalid'}
                                  placeholder='Enter Email Address'
                                  value={address}
                                  onChange={(e) => {
                                      // validate(e);
                                      setAddress(e)
                                  }}
                                  autoFocus={true} />
                </Form.Group>
                <Form.Group>
                    <div className="element-wrapper with--checkbox">
                        <label className="checkbox path"   >
                            <input type="checkbox" name='isPrimary' checked={isPrimary} defaultValue={trueFalse[1].value} onChange={e => onChange(e)}/>
                            {checkBox} &nbsp; MakePrimary
                        </label>
                    </div>
                </Form.Group>
            </Form.Group>
        </Col>
    )
}

export default AddEmailField;
