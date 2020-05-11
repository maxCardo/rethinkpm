import React from 'react'


const CollectionField = ({field, data}) => {

    const theFields = eval(`data.${field.datatype}`).sort((a, b) => {
        return b.value - a.value;
    }).slice(0, 3);

    const printItem = (entry, index) => {
        return (<span key={index} className="label__blue">{entry.name}</span>)
    }

    return (
        <div>
            <p>
                <b>{field.name}</b>: {theFields.map((item, index) => printItem(item, index))}{/*<b>{field.name}:</b>&nbsp;{eval(`data.${field.accessor}`) ? eval(`data.${field.accessor}`) :'n/a'}*/}
            </p>
        </div>
    )
}

export default CollectionField