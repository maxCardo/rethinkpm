import React from 'react';
import TextField from './InputFields/TextField';
import AddCollectionField from "./InputFields/AddCollectionField";
import AddStatusField from './InputFields/AddStatusField';
import AddEmailField from './InputFields/AddEmailField';
import AddPhoneField from './InputFields/AddPhoneField';
import AddSelectField from "./InputFields/AddSelectField";


const AddFields = (props) => {

    const {field: {accessor, datatype}} = props
    const selector = datatype ? datatype : accessor
    switch (selector) {

        case 'email':
            return <AddEmailField {...props} />;
        case 'phoneNumbers':
            return <AddPhoneField {...props}  />;
        case 'status':
            return <AddStatusField {...props} fieldSettings={props.settings} profile={props.profile} />;
        case 'collection':
            return <AddCollectionField {...props} />;
        case 'select':
            return <AddSelectField {...props}  fieldSettings={props.settings} profile={props.profile} />;
        default:
            return <TextField {...props} />;
    }
}

export default AddFields;
