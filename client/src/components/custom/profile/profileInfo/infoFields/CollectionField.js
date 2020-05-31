/* eslint-disable */
import React from 'react'
import {accessData} from '../../../../../util/commonFunctions'


const CollectionField = ({field, data}) => {
  const value = accessData(data, field.datatype)
    const theFields =  (value && value.length) ? value.sort((a, b) => {
        return b.value - a.value;
    }).slice(0, 3) : 'no entries';

    const printItem = (entry, index) => {
        return (<span key={index} className="label__blue">{entry.name}</span>)
    }

    return (
        <div>
            <p>
                <b>{field.name}</b>: {Array.isArray(theFields) ? theFields.map((item, index) => printItem(item, index)) : theFields}
            </p>
        </div>
    )
}

export default CollectionField