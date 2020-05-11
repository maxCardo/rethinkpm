import React from 'react'


const SimpleField = ({field, data}) => {

    const theFields = eval(`data.${field.datatype}`).sort((a, b) => {
        return b.value - a.value;
    }).slice(0, 3);

    const printItem = (entry) => {
        return (<span className="label__blue">{entry.name}</span>)
    }

    return (
        <div>
            <p>
                <b>{field.name}</b>: {theFields.map((item) => printItem(item))}{/*<b>{field.name}:</b>&nbsp;{eval(`data.${field.accessor}`) ? eval(`data.${field.accessor}`) :'n/a'}*/}
            </p>
        </div>
    )
}

export default SimpleField