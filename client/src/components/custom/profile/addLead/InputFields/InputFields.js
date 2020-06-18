import React from 'react';
import TextField from './TextField';
import AddCollectionField from "./AddCollectionField";
import AddStatusField from './AddStatusField';
import AddEmailField from './AddEmailField';
import AddPhoneField from './AddPhoneField';
import AddSelectField from "./AddSelectField";


const AddFields = (props) => {

    const {field: {accessor, datatype}} = props
    const selector = datatype ? datatype : accessor
    switch (selector) {

        case 'email':
            return <AddEmailField {...props} />;
        case 'phoneNumbers':
            return <AddPhoneField {...props}  />;
        case 'status':
            return <AddStatusField {...props}/>;
        case 'collection':
            return <AddCollectionField {...props} />;
        case 'select':
            return <AddSelectField {...props}  fieldSettings={props.settings} profile={props.profile} />;
        default:
            return <TextField {...props} />;
    }
}

export default AddFields;
