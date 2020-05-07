import React from 'react';
import SimpleField from './SimpleField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import StatusField from './StatusField';

const InfoFields = (props) => {
  
  const {field:{accessor}} = props
    switch (accessor) {
      case 'phoneNumbers':
        return <PhoneField {...props} />;
      case 'email':
        return <EmailField {...props} />;
      case 'status':
        return <StatusField {...props} />;
      default:
        return <SimpleField {...props} />;
    }
}

export default InfoFields;
