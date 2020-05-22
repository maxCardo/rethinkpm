/* eslint-disable */
import React from 'react'


const SimpleField = ({field, data}) => {

    let dataField
    
    try {
        eval(`data.${field.accessor}`)
        dataField = `data.${field.accessor}`
    } catch (err) {
        console.log('running catch');
    }
    

    return (
        <p>
            <b>{field.name}:</b>&nbsp;{eval(dataField) ? eval(dataField) :'n/a'}
        </p>
    )
}

export default SimpleField