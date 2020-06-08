import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import {checkBoxCheck} from "../../../../../util/commonFunctions";
import Select from "react-select";


const AddPhoneField = (field, form) => {

    const trueFalse = [
        {value: "true", label: 'Yes'},
        {value: "false", label: 'No'}
    ];

    const [valid, setValid] = useState(false);
    const [number, setNumber] = useState('');
    const [isPrimary, setIsPrimary] = useState(true);
    const [okToText, setOkToText] = useState(true);
    const [formData, setFormData] = useState(form);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const checkBox = checkBoxCheck();

    const onOkChange = () => {
        setOkToText(!okToText)
    }
    const onPrimaryChange = () => {
        setIsPrimary(!isPrimary)
    }

    const validate = (e) => {
        const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        setValid(!!e.target.value.match(validPhone))
    }

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
                                      validate(e);
                                      setNumber(e.target.value)
                                  }}
                                  autoFocus={true} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="checkbox path">
                        <input type="checkbox" name='okToText' checked={okToText} defaultValue={trueFalse[0].value} onChange={onOkChange}/>
                        {checkBox} &nbsp; Ok to text
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <div className="element-wrapper with--checkbox">
                        <Form.Label className="checkbox path">
                            <input type="checkbox" name='isPrimary' checked={isPrimary} defaultValue={trueFalse[0].value} onChange={onPrimaryChange}/>
                            {checkBox} &nbsp; Primary
                        </Form.Label>
                    </div>
                </Form.Group>
            </Form.Group>
        </Col>
    )
}

export default AddPhoneField;
