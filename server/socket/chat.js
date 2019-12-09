const ChatInq = require('../db/models/prospects/RentLeads/chat')

const chat = (io) => {
    io.sockets.on('connection', (socket) => {
        console.log('user connnected');

        socket.on('testOn', (data) => {
            console.log(data);
        })

        const testEmit = () => {
            console.log('running test emit');
            socket.emit('test', { msg: 'test message' });
        }


        socket.on('ui_msg', async (data, callback) => {
            let chat = await ChatInq.findById(data._id)
            chat.messages.unshift({ message: data.msg });
            await chat.save()
            //TO DO: change to only send msg back
            callback(chat)
        })

        socket.on('read_msg', async (data) => {
            let chat = await ChatInq.findById(data._id)
            chat.unread = false
            await chat.save()
        })




    })
}


module.exports = chat