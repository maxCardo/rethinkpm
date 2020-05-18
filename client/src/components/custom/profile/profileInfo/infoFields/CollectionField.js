/* eslint-disable */
import React from 'react'


const CollectionField = ({field, data}) => {

    const theFields =  (eval(`data.${field.datatype}`) && eval(`data.${field.datatype}`).length) ? eval(`data.${field.datatype}`).sort((a, b) => {
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