import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Col, Form, Button} from 'react-bootstrap';
import {checkBoxCheck} from "../../../../../util/commonFunctions";


const AddPhoneField = ({field, form, onChangeArray}) => {

    let phoneNumbersCount = useRef(1);
    const emptyPhone =  {number:'', okToText:true, isPrimary: false}

    const [valid, setValid] = useState(false);
    const [formData, setFormData] = useState([emptyPhone]);

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
        let newFormEntry = {
            ...formData[index]
        };

        newFormEntry = {...newFormEntry, [e.target.name]: e.target.checked};

        let newFormData = formData;
            newFormData[index] =  newFormEntry;

        setFormData(newFormData);
    }

    const onClickAdd = () => {
        let newFormData = formData;
        console.log('newFormData');
        console.log(newFormData)
            newFormData.push(emptyPhone)
        setFormData(newFormData);
        phoneNumbersCount.current = phoneNumbersCount.current++;
        console.log(' phoneNumbersCount.current');
        console.log( phoneNumbersCount.current);
    }

    const validate = (e) => {
        const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        e && setValid(!!e.target.value.match(validPhone))
    }

    useEffect(() => {

        onChangeArray(field.accessor, formData);
        console.log('formData');
        console.log(formData);
        if (formData.length === phoneNumbersCount.current) {
            console.log('now');
        }

    }, [formData,phoneNumbersCount.current]);

    const checkBox = checkBoxCheck();

    return (
        <Col lg={12}>
            {formData && formData.map((value, index) => {
                return (
                    <Form.Group className="addPhoneGroup" key={index}>
                        <Form.Group>
                            <Form.Label>Number:</Form.Label>
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
                                <input type="checkbox" defaultChecked={formData[index].okToText} name={'okToText'} onChange={(e) => onCheckChange(e, index)}/>
                                {checkBox} &nbsp; Ok to text
                            </Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <div className="element-wrapper with--checkbox">
                                <Form.Label className="checkbox path">
                                    <input type="checkbox" name='isPrimary' onChange={(e) => onCheckChange(e, index)}/>
                                    {checkBox} &nbsp; Primary
                                </Form.Label>
                            </div>
                        </Form.Group>
                       { (index === formData.length - 1)
                           ?
                       <Form.Group>
                           <button className='action-buttons__button' onClick={onClickAdd}>
                               <i className="fas fa-plus"></i>
                           </button>
                       </Form.Group>
                           :
                           <Form.Group>
                               <button className='action-buttons__button' onClick={onClickAdd}>
                                   <i className="fas fa-trash"></i>
                               </button>
                           </Form.Group>
                       }

                    </Form.Group>
                )
            })}
        </Col>
    )
}

export default AddPhoneField;
