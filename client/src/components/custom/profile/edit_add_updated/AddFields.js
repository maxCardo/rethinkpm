import React, {useState} from 'react';
import TextField from './InputFields/TextField';
import AddCollectionField from "./InputFields/AddCollectionField";
import AddStatusField from './InputFields/AddStatusField';
import AddEmailField from './InputFields/AddEmailField';
import AddPhoneField from './InputFields/AddPhoneField';


const AddFields = (props) => {

    const {field: {accessor}} = props
    switch (accessor) {

        case 'email':
            return <AddEmailField {...props} />;
        case 'phoneNumbers':
            return <AddPhoneField {...props}  />;
        case 'status':
            return <AddStatusField {...props} onChange={props.onChange} />;
        case 'collection':
            return <AddCollectionField {...props} onChange={props.onChange} />;
        default:
            return <TextField {...props} onChange={props.onChange} />;
    }
}

export default AddFields;
