import React, {useEffect, useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import PropTypes from "prop-types";

import {checkBoxCheck, validateEmail} from "../../../../../util/commonFunctions";


const AddEmailField = ({field, form, onChangeArray}) => {

    const emptyEmail = { address: '', isPrimary: false };

    const [valid, setValid] = useState(true);
    const [formData, setFormData] = useState([{ address: '', isPrimary: true }]);
    const [emailsCount, setEmailsCount] = useState(1);

    const onChangeAddress = (e, idx) => {
        let newFormEntry = {
            ...formData[idx]
        };

        newFormEntry[e.target.name] = e.target.value;
        let newFormObject = [...formData];
        newFormObject[idx][e.target.name] = e.target.value;
        setFormData(newFormObject);
        validate(e);
    };

    const validate = (e) => {
        e && setValid(validateEmail(e.target.value))
    }

    const onCheckChange = (e, idx) => {
        let newFormData = formData
        newFormData.forEach((record) => {
            record.isPrimary = false
        })
        newFormData[idx].isPrimary = true
        setFormData([...newFormData]);

    };

    const onClickAdd = () => {
        let newFormData = formData;
        newFormData.push(emptyEmail);
        setFormData(newFormData);
        setEmailsCount(emailsCount + 1 );
    };

    const onClickDelete = (idx) => {
        let newFormData = formData;
        if(newFormData[idx].isPrimary == true){
            newFormData[0].isPrimary = true 
        }
        newFormData.splice(idx, 1);
        setFormData(newFormData);
        setEmailsCount(emailsCount - 1 );
    };

    useEffect(() => {
        onChangeArray(field.accessor, formData);
    }, [formData]);

    const checkBox = checkBoxCheck();

    return (
        <Col lg={12}>
            {formData && formData.map((value, index) => {
                return (
                    <Form.Group className="addEmailGroup" key={index}>
                        <Form.Group>
                            {(index < 1) && (<Form.Label>{field.name}:</Form.Label>)}
                            <Form.Control type="text" name='address'
                                          className={valid ? 'valid' : 'invalid'}
                                          placeholder='Enter Email Address'
                                          value={formData && formData[index].address}
                                          onChange={(e) => {
                                              onChangeAddress(e, index);
                                          }}
                                          autoFocus={true} />
                        </Form.Group>
                        <Form.Group>
                            <div className="element-wrapper with--checkbox">
                                <label className="checkbox path"   >
                                    <input type="checkbox" name='isPrimary'
                                           checked = {formData && formData[index].isPrimary}
                                           onChange={(e) => onCheckChange(e, index)}/>
                                    {checkBox} &nbsp; Primary
                                </label>
                            </div>
                        </Form.Group>

                        { (index === 0)
                            ?
                            <Form.Group>
                                <button className='action-buttons__button' onClick={onClickAdd}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </Form.Group>
                            :
                            <Form.Group>
                                <button className='action-buttons__button' onClick={() => onClickDelete(index)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </Form.Group>
                        }
                    </Form.Group>
                )
            })}
            {(!valid) && <span className='addEmailField__invalidMessage'>Please insert all valid email addresses.</span>}
        </Col>
    )
};

AddEmailField.propTypes ={
    field: PropTypes.object.isRequired,
    onChangeArray: PropTypes.func.isRequired,
};

export default AddEmailField;
