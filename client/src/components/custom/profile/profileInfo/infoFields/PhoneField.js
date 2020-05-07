import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

import {tglAddPhoneMod} from '../../../../../actions/profile'

//crate useEffect on load  to find primary number and set var
//action/reducer/api EP for handling add and editPrime phone num

//ToDO: for future. add dropdown arrow to show other phone numbers and checkbox to make primary

const PhoneField = ({tglAddPhoneMod}) => {
    var phone = '4125138992'
    
    useEffect(() => {
        //get primary number
        //format for dom
        console.log('use effect');
    }, [])

    const [edit, toggleEdit] = useState(false)
    const [phoneValid, setPhoneValid] = useState(true)
    const [showConfModel, setConfModel] = useState(false)
    const [editPhone, setEditPhone] = useState('4125138992')
    
    const editPhonefunc = async (e) => {
        setEditPhone(e)
        var validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        setPhoneValid(!!e.match(validPhone))
    }
    const editPrimePhone = () => {
        console.log('edit prime phone place holder')
    }
    


    return (
        <Fragment>
            <div className='Phone'>
                <b>Phone:&nbsp;</b>
                <input
                    type='text'
                    className= {phoneValid ? 'valid':'invalid'}
                    name='phonePrimary'
                    disabled={!edit}
                    value={edit ? editPhone : phone}
                    onChange={(e) => editPhonefunc(e.target.value)}
                />
                { !edit ? (
                    <button className='action-buttons__button singleFieldEdit' onClick={() => toggleEdit(true)}>
                        <i className='fas fa-pencil-alt'></i>
                    </button>
                ):(
                    <Fragment>    
                        <button
                            className='action-buttons__button ab__confirm singleFieldEdit'
                            disabled= {!phoneValid}
                            onClick={() => {editPhone != phone ? setConfModel(true) : toggleEdit(false)}}
                        >
                            <i className='fas fa-check'></i>
                        </button>
                        <button className='action-buttons__button ab__cancel singleFieldEdit'
                            onClick={() => {toggleEdit(false); editPhonefunc(phone)}}
                        >
                            <i className='fas fa-times'></i>
                        </button>
                    </Fragment>
                )}
                <button
                    className='action-buttons__button addPhoneNumber'
                    onClick={() => {toggleEdit(false); editPhonefunc(phone); tglAddPhoneMod(true)}}
                >
                    <i className='fas fa-plus'></i>
                </button>
            </div>
                 
            <Modal size='md' show={showConfModel} onHide={() => {editPhonefunc(phone); setConfModel(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to change the primary phone number</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" variant="secondary" onClick={() => editPrimePhone()}>
                        Confirm
                    </Button>
                    <Button className="btn btn-danger" variant="secondary" onClick={() => {toggleEdit(false); editPhonefunc(phone); setConfModel(false)}}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>         
        </Fragment>
    )
}


export default connect(null, {tglAddPhoneMod})(PhoneField)