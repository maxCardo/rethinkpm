import React from 'react'


const SimpleField = ({field, data}) => {

    return (
        <p>
            <b>{field.name}:</b>&nbsp;{eval(`data.${field.accessor}`) ? eval(`data.${field.accessor}`) :'n/a'}
        </p>
    )
}

export default SimpleField