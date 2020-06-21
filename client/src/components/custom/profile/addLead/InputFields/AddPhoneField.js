import React, { useEffect, useState} from 'react';
import PropTypes from "prop-types";
import { Col, Form } from 'react-bootstrap';

import { checkBoxCheck } from "../../../../../util/commonFunctions";


const AddPhoneField = ({field, onChangeArray}) => {

    const emptyPhone =  {number:'', okToText:true, isPrimary: false}

    const [valid, setValid] = useState(true);
    const [formData, setFormData] = useState([{number:'', okToText:true, isPrimary: true}]);
    const [phoneNumbersCount, setPhoneNumbersCount] = useState(1);

    const onChangeNumber =(e, idx) => {
        let newFormEntry = {
            ...formData[idx]
        };

        newFormEntry[e.target.name] = e.target.value;
        let newFormObject = [...formData];
        newFormObject[idx][e.target.name] = e.target.value;
        setFormData(newFormObject);
        validate(e);
    };

    const onCheckChange = (e, index) => {
        let newFormData = formData;
        newFormData.map((record) => {
          record.isPrimary = false;
        });
        newFormData[index].isPrimary = true;
        setFormData([...newFormData]);
    };

    const onClickAdd = () => {
        let newFormData = formData;
        newFormData.push(emptyPhone);
        setFormData(newFormData);
        setPhoneNumbersCount(phoneNumbersCount + 1 );
    };

    const onClickDelete = (idx) => {
        let newFormData = formData;
        if (newFormData[idx].isPrimary == true) {
          newFormData[0].isPrimary = true;
        }
        newFormData.splice(idx, 1);
        setFormData(newFormData);
        setPhoneNumbersCount(phoneNumbersCount - 1 );
    };

    const validate = (e) => {
        const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        e && setValid(!!e.target.value.match(validPhone))
    };

    useEffect(() => {

        onChangeArray(field.accessor, formData);

    }, [field.accessor, formData]);

    const checkBox = checkBoxCheck();

    return (
        <Col lg={12}>
            {formData && formData.map((value, index) => {
                return (
                    <Form.Group className="addPhoneGroup" key={index}>
                        <Form.Group>
                            {(index < 1) && (<Form.Label>Number:</Form.Label>)}
                            <Form.Control type="text" name='number'
                                          className={valid ? 'valid' : 'invalid'}
                                          placeholder="Enter a Number"
                                          value={formData[index]['number']}
                                          onChange={(e) => {
                                              onChangeNumber(e, index);
                                          }}
                                          autoFocus={true} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="checkbox path">
                                <input type="checkbox" checked={formData && formData[index].okToText} name='okToText' onChange={(e) => onCheckChange(e, index)}/>
                                {checkBox} &nbsp; Ok to text
                            </Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <div className="element-wrapper with--checkbox">
                                <Form.Label className="checkbox path">
                                    <input type="checkbox" name='isPrimary' checked={formData && formData[index].isPrimary} onChange={(e) => onCheckChange(e, index)}/>
                                    {checkBox} &nbsp; Primary
                                </Form.Label>
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
            {(!valid) && <span className='addPhoneField__invalidMessage'>Please insert all valid phone numbers.</span>}
        </Col>
    )
};

AddPhoneField.propTypes ={
    field: PropTypes.object.isRequired,
    onChangeArray: PropTypes.func.isRequired,
};

export default AddPhoneField;
