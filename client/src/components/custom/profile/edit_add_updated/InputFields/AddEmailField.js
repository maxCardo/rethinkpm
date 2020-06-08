import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import {checkBoxCheck, validateEmail} from "../../../../../util/commonFunctions";


const AddEmailField = (field, form) => {

    const trueFalse = [
        {value: "true", label: 'Yes'},
        {value: "false", label: 'No'}
    ];

    const [valid, setValid] = useState(false);
    const [address, setAddress] = useState('');
    const [isPrimary, setIsPrimary] = useState(true);

    const validate = (e) => {
        e && setValid(validateEmail(e.target.value))
    }


    const onPrimaryChange = () => {
        setIsPrimary(!isPrimary);
    }

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
                                      validate(e);
                                      setAddress(e.target.value)
                                  }}
                                  autoFocus={true} />
                </Form.Group>
                <Form.Group>
                    <div className="element-wrapper with--checkbox">
                        <label className="checkbox path"   >
                            <input type="checkbox" name='isPrimary' checked={isPrimary} defaultValue={trueFalse[1].value} onChange={onPrimaryChange}/>
                            {checkBox} &nbsp; Primary
                        </label>
                    </div>
                </Form.Group>
            </Form.Group>
        </Col>
    )
}

export default AddEmailField;
