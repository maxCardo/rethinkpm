import React, {useEffect} from 'react'
import Loading from '../../core/LoadingScreen/Loading'

const OwnerInfo = ({ownerInfo:{data ,loading}}) => {

    useEffect(() => {
        
    }, [data])
    
    
    return loading? <Loading/>:(
        <div>
            <p className='DetailsModal__description'>....This is owner info in component</p>
        </div>
    )
}

export default OwnerInfo