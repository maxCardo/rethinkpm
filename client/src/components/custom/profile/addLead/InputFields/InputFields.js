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
            return <AddSelectField {...props} />;
        default:
            return <TextField {...props} />;
    }
}

export default AddFields;

//ToDo: target Price range for buyer should be set number data set. can be range simmiler to agent sales select
//ToDo: property for renters should be select based on active listing pulled from state like offices 
//ToDo: pets: should be able to add additional pet dog/cat/other select
//ToDo: other preferences. allow to choose from list of other preferences and to add custom 
