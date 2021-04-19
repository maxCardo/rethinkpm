import React, { useEffect} from 'react'


const Journal = ({history}) => {
    useEffect(() => {
        console.log(history)

    }, [])

    return (
        <div>
            <h1>this is journal view!</h1>
        </div>
    )

}

export default Journal