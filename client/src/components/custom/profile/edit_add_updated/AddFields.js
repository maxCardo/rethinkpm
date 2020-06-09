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
            return <AddStatusField {...props} fieldSettings={props.settings} profile={props.profile} />;
        case 'collection':
            return <AddCollectionField {...props} />;
        default:
            return <TextField {...props} />;
    }
}

export default AddFields;
