import React, {useEffect, useState} from 'react'

const CompView = (data) => {
    useEffect(() => {
        console.log('data')
        console.log(data)
        
    }, [])


    return (
        <div>
            <h1>this is comp view!</h1>
        </div>
    )
    
}

export default CompView


