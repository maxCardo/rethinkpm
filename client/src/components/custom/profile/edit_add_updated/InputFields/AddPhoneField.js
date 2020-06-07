import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import {checkBoxCheck} from "../../../../../util/commonFunctions";
import Select from "react-select";


const AddPhoneField = (field, form) => {

    const trueFalse = [
        {value: "true", label: 'Yes'},
        {value: "false", label: 'No'}
    ];

    const [valid, validate] = useState(false);
    const [number, setNumber] = useState('');
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
                    <Form.Label>Number:</Form.Label>
                    <Form.Control type="text" name='number'
                                  className={valid ? 'valid' : 'invalid'}
                                  placeholder="Enter a Number"
                                  value={number}
                                  onChange={(e) => {
                                      // validate(e);
                                      setNumber(e)
                                  }}
                                  autoFocus={true} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ok to text:</Form.Label>
                    <Select name="okToText"
                            defaultValue={trueFalse[1]}
                            onChange={(e) => onChange({target: {name: 'okToText', value: e}})}
                            options={trueFalse}
                            isSearchable={false}
                    />
                </Form.Group>
                <Form.Group>
                    <div className="element-wrapper with--checkbox">
                        <label className="checkbox path">
                            <input type="checkbox" name='isPrimary' checked={isPrimary} defaultValue={trueFalse[0].value} onChange={e => onChange(e)}/>
                            {checkBox} &nbsp; Make Primary
                        </label>
                    </div>
                </Form.Group>
            </Form.Group>
        </Col>
    )
}

export default AddPhoneField;
