import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import './style.css'

const Loading = () => {
    return (
        <div className='loading-screen__container'>
            <BeatLoader
                size={20}
                color={"#4285F4"}
                loading={true}
            />
        </div>
    )
}


export default Loading
