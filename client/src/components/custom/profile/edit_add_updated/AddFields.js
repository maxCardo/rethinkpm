import React, {useState} from 'react';
import TextField from './InputFields/TextField';
import AddCollectionField from "./InputFields/AddCollectionField";
import AddStatusField from './InputFields/AddStatusField';
import AddEmailField from './InputFields/AddEmailField';
import AddPhoneField from './InputFields/AddPhoneField';


const AddFields = (props) => {
console.log(props);
    const {field: {accessor}} = props
    switch (accessor) {
        case 'phoneNumbers':
            return <AddPhoneField {...props} />;
        case 'email':
            return <AddEmailField {...props}/>;
        case 'status':
            return <AddStatusField {...props} />;
        case 'collection':
            return <AddCollectionField {...props} />;
        default:
            return <TextField {...props} onChange={props.onChange} />;
    }
}

export default AddFields;
