import React from 'react';
import SimpleField from './SimpleField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import StatusField from './StatusField';
import CollectionField from './CollectionField';

const InfoFields = (props) => {
  const keys = Object.keys(props).length;
  console.log(keys);
  
  const {field:{accessor}} = props
    switch (accessor) {
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
