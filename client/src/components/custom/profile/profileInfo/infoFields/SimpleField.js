import React from 'react'


const SimpleField = ({field, data}) => {

    return (
        <p key={field.accessor} >
            <b>{field.name}:</b>&nbsp;{eval(`data.${field.accessor}`) ? eval(`data.${field.accessor}`) :'n/a'}
        </p>
    )
}

export default SimpleField