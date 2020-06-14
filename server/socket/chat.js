const Chat = require('../db/models/comms/Chat')
const RentInq = require('../db/models/prospects/RentLeads/RentInq')
const RentPros = require('../db/models/prospects/RentLeads/RentPros')
const AgentPros = require('../db/models/sales/agent')
const BuyerPros = require('../db/models/prospects/BuyerPros')
const {sendSMS} = require('../3ps/sms')
const {sendEmail} = require('../3ps/email')

const chat = (io) => {
    io.sockets.on('connection', (socket) => {

        socket.on('testOn', (data) => {
            console.log(data);
        })

        socket.on('ui_msg', async (data, callback) => {
            const {chatID, msg} = data
            let chat = await Chat.findById(chatID)
            const phoneNumber = await getPhoneNumberOfOwner(chat.owner, chat.ownerType)
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

async function getPhoneNumberOfOwner(ownerId, ownerType) {
  if(ownerType == 'rentPros') {
    return await getPhoneNumberOfRentPros(ownerId)
  }
  if(ownerType == 'agentPros') {
    return await getPhoneNumberOfAgentPros(ownerId)
  }
  if(ownerType == 'buyerPros') {
    return await getPhoneNumberOfBuyerPros(ownerId)
  }
}

async function getPhoneNumberOfRentPros(rentInqId) {
  const rentInqData = await RentInq.findById(rentInqid).populate('prospect')
  const phoneNumber = rentInqData.prospect.phoneNumbers.find((phone) => phone.isPrimary)
  return phoneNumber.number
}

async function getPhoneNumberOfAgentPros(agentId) {
  const agentData = await AgentPros.findById(agentId)
  const phoneNumber = agentData.phoneNumbers.find((phone) => phone.isPrimary)
  return phoneNumber.number
}

async function getPhoneNumberOfBuyerPros(buyerId) {
  const buyerData = await BuyerPros.findById(buyerId)
  const phoneNumber = buyerData.phoneNumbers.find((phone) => phone.isPrimary)
  return phoneNumber.number
}


module.exports = chat