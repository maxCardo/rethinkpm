/* eslint-disable */
import React from 'react';
import {formatMoney} from '../../../../../util/commonFunctions'


const SimpleField = ({field, data}) => {

    let fieldValue = eval(`data.${field.accessor}`) ? eval(`data.${field.accessor}`) :'n/a';

    if (field.formatter === 'formatMoney') {
        fieldValue = eval(`data.${field.accessor}`) ? formatMoney(eval(`data.${field.accessor}`)) :'n/a';
    }

    return (
        <p>
            <b>{field.name}:</b>&nbsp;{fieldValue}
        </p>
    )
}

export default SimpleField