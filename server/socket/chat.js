const ChatInq = require('../db/models/prospects/RentLeads/chat')
const {sendSMS} = require('../3ps/sms')
const {sendEmail} = require('../3ps/email')

const chat = (io) => {
    io.sockets.on('connection', (socket) => {
        console.log('user connnected');

        socket.on('testOn', (data) => {
            console.log(data);
        })

        socket.on('ui_msg', async (data, callback) => {
            const {chatID, msg} = data
            let chat = await ChatInq.findById(chatID).populate({path:'inq',select:'prospect', populate: {path:'prospect', select: 'phone'}})
            const phoneNumber = chat.inq.prospect.phone.phoneNumber
            chat.messages.push(msg);
            await chat.save()
            //send chat to pros (if no phone num must indicate on UI)
            sendSMS(phoneNumber, msg.message)
            //TO DO: change to only send msg back
            socket.emit('chat_updated', chat)
        })

        //To DO: add email from UI function
        
        socket.on('read_msg', async (data) => {
            let chat = await ChatInq.findById(data._id)
            chat.unread = false
            await chat.save()
        })
    })
}


module.exports = chat