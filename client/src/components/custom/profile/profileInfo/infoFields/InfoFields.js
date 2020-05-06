import React from 'react';
import SimpleField from './SimpleField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';


const InfoFields = (props) => {

    console.log('props from infoFiels', props);
    var test = 'test123'


    switch (test) {
      case 'phoneNumbers':
        return <PhoneField {...props} />;
      case 'email':
        return <EmailField {...props} />;
      default:
        return <SimpleField {...props} />;
    }
}

export default InfoFields;
