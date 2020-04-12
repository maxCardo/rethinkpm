//import React , {useEffect} from 'react';
//import io from 'socket.io-client';

// let socket;

// const Playground = () => {
//     const ENDPOINT = 'localhost:5000'

//     useEffect(() => {
//         console.log('hook running');
//         socket = io(ENDPOINT);
//         socket.emit('testOn', {msg:'test connection'})
        
//         socket.on('test', (data) => {
//             console.log(data);
//         })

//     })

//     const action = () => {
//         socket.emit('ui_msg', { _id: '5dee2b52bf32c736fcdb6001', msg: 'test ui message' },(chat) => {
//             console.log(chat);   
//         });
//     }


//     const action2 = () => {
//         socket.emit('read_msg', { _id: '5dee2b52bf32c736fcdb6001'});
//     }

//     return (
//         <div>
//             <button onClick = {action}>Send Test Msg</button>
//             <br/>
//             <br/>
//             <button onClick={action2}>Read Msg</button>
//         </div>
//      )
// }


// export default Playground
