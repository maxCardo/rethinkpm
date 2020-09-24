import React from 'react';
import {formatMoney, accessData} from '../../../../../util/commonFunctions'


const SimpleField = ({field, data}) => {
    
    let fieldValue = accessData(data, field.accessor)
    let value; 
    if (fieldValue === true) { value = 'Yes' } else if (fieldValue === false){ value = 'No'} else { value = fieldValue }
    if (field.formatter === 'formatMoney') {
      fieldValue = formatMoney(fieldValue)
    }

    if(!fieldValue) {
      fieldValue = 'n/a'
    }

    return (
        <p>
          <b>{field.name}:</b>&nbsp;{value}
        </p>
    )
}


export default SimpleField