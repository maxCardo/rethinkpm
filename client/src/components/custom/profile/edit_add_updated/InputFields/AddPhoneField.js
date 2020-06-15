import React, {useCallback, useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import {checkBoxCheck} from "../../../../../util/commonFunctions";


const AddPhoneField = ({field, form, onChangeArray}) => {


    const [valid, setValid] = useState(false);
    const [number, setNumber] = useState('');
    const [formData, setFormData] = useState({number:'', okToText:true, isPrimary: false});

    const onChange =(e) => {
        setNumber(e.target.value);
        let newFormData = {[e.target.name]: e.target.value};
        setFormData({ ...formData, ...newFormData});
        validate(e);
    };

    const onCheckChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.checked})
    }

    const validate = (e) => {
        const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        e && setValid(!!e.target.value.match(validPhone))
    }

    useEffect(() => {

        onChangeArray(field.accessor, formData);

    }, [formData]);

    const checkBox = checkBoxCheck();

    return (
        <Col lg={12}>
            <Form.Group className="addPhoneGroup">
                <Form.Group>
                    <Form.Label>Number:</Form.Label>
                    <Form.Control type="text" name='number'
                                  className={valid ? 'valid' : 'invalid'}
                                  placeholder="Enter a Number"
                                  value={number}
                                  onChange={(e) => {
                                      onChange(e);
                                  }}
                                  autoFocus={true} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="checkbox path">
                        <input type="checkbox" defaultChecked={formData.okToText} name='okToText' onChange={(e) => onCheckChange(e)}/>
                        {checkBox} &nbsp; Ok to text
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <div className="element-wrapper with--checkbox">
                        <Form.Label className="checkbox path">
                            <input type="checkbox" name='isPrimary' onChange={(e) => onCheckChange(e)}/>
                            {checkBox} &nbsp; Primary
                        </Form.Label>
                    </div>
                </Form.Group>
            </Form.Group>
        </Col>
    )
}

export default AddPhoneField;
