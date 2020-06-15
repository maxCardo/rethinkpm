import React from 'react';
import SimpleField from './SimpleField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import StatusField from './StatusField';
import CollectionField from './CollectionField';

const InfoFields = (props) => {

  //ToDo: clean up settings.json, this should pull from dataType and accesor collections should be its dataType and accesor its current dataType
  //ref add/edit profile when refactoring. 
  const {field:{accessor, datatype}} = props
    const selector = datatype ? datatype : accessor
    switch (selector) {
      case 'phoneNumbers':
        return <PhoneField {...props} />;
      case 'email':
        return <EmailField {...props} />;
      case 'status':
        return <StatusField {...props} />;
      case 'collection':
        return <CollectionField {...props} />;
      default:
        return <SimpleField {...props} />;
    }
}

export default InfoFields;
