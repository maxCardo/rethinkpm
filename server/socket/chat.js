const Chat = require('../db/models/comms/Chat')
const RentInq = require('../db/models/prospects/RentLeads/RentInq')
const RentPros = require('../db/models/prospects/RentLeads/RentPros')
const AgentPros = require('../db/models/prospects/agentPros/agent')
const BuyerPros = require('../db/models/prospects/BuyerPros')
const {sendSMS} = require('../3ps/sms')
const {sendEmail} = require('../3ps/email')
const getOwner = require('../api/chatOwner/getOwner')

const chat = (io) => {
    io.sockets.on('connection', (socket) => {

        socket.on('testOn', (data) => {
            console.log(data);
        })

        socket.on('ui_msg', async (data, callback) => {
            const {chatID, msg} = data
            let chat = await Chat.findById(chatID)
            const owner = getOwner(chat.owner, chat.ownerType)
            const phoneNumber = await owner.getPhone()
            chat.messages.push(msg);
            await chat.save()
            //send chat to pros (if no phone num must indicate on UI)
            sendSMS(phoneNumber, msg.content)
            //TO DO: change to only send msg back
            socket.emit('chat_updated', chat)
        })

        //To DO: add email from UI function
        
        socket.on('read_msg', async (data) => {
            let chat = await Chat.findById(data._id)
            chat.unread = false
            await chat.save()
        })
    })
}


module.exports = chat