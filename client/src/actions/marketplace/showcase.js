import axios from "axios";


const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };


export const flagProperty = async (id) => {

    console.log('running function to flag peoperty from actions')
    const res = await axios.post(`/api/marketplace/showcase/flagdeal`, {id}, config)
    console.log('res: ', res)
    if (res.status === 200) {
        alert('Record Saved')
        
    }else if(res.status === 500){
        alert('Error Saving Record')
    }

}

export const getShowcaseData = async () => {

    console.log('running get showcase data')
    try {
        const res = await axios.get('/api/marketplace/showcase/showcasedeals')
        console.log('res: ', res)    
    } catch (error) {
        
    }
}

