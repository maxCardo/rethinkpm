/* eslint-disable */
import React from 'react';
import {formatMoney, filterData, accessData} from '../../../../../util/commonFunctions'


const SimpleField = ({field, data}) => {
    
    let fieldValue = accessData(data, field.accessor)

    if (field.formatter === 'formatMoney') {
      fieldValue = formatMoney(fieldValue)
    }

    if(!fieldValue) {
      fieldValue = 'n/a'
    }

   

    return (
        <p>
            <b>{field.name}:</b>&nbsp;{fieldValue}
        </p>
    )
}


export default SimpleField