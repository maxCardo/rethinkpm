import axios from "axios";
import { Alert } from "react-bootstrap";


const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };


export const flagProperty = async (id) => {

    console.log('running function to flag peoperty from actions')
    const res = await axios.post(`/api/marketplace/showcase/test`, {id}, config)
    console.log('res: ', res)
    if (res.status === 200) {
        alert('Record Saved')
        
    }else if(res.status === 500){
        alert('Error Saving Record')
    }

}
