import axios from "axios";


const config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };


export const flagProperty = async (id) => {

    console.log('running function to flag peoperty from actions')
    const res = await axios.post(`/api/marketplace/showcase/test`, {id}, config)
    console.log('res: ', res)
}
