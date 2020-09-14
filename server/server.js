const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const trigger = require('./triggers/rentLead');
const dbConnect = require('./db/db');
//DB Models
const RentPros = require('./db/models/prospects/RentLeads/RentLeadPros');
const Chat = require('./db/models/comms/Chat')
const Agent = require('./db/models/prospects/agentPros/agent')
const { postSlack } = require('./3ps/slack');
//ToDo: change to call to DB once property table is created
const { propertyNum } = require('./3ps/calandly');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');
const uuid = require('uuid/v1');

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());


dbConnect();

//Init middle ware. replaces bodyParser
app.use(express.json({extended:false}));

//api routes
app.use('/api/users', require('./api/users'));
app.use('/api/tasks', require('./api/tasks'));
app.use('/api/3ps',(req,res,next) => {req.io = {io:io}, next()}, require('./api/3ps'));
app.use('/api/sales', require('./api/salesLeads'));
//app.use('/api/agent_lead', require('./api/agentLead'));
app.use('/api/rent_lead', require('./api/rentLead'));
app.use('/api/comms', require('./api/comms'));
app.use('/api/profile', require('./api/profile/profile'));
app.use('/api/marketplace', require('./api/marketplace/_marketplace'));

//Socket.io socket and API calls
require('./socket/chat')(io);

//store on DB in future may need to create type object for model names id sored as String in DB
const activeNumber = [
  {
    number: "+14124447505",
    profile: 'agentPros',
    campaign: '',
    model: Agent
  },
  {
    number: "+14124447710",
    profile: 'rentPros',
    campaign: '1500 Fallowfield',
    model: RentPros
  },

]

// @route: Post /sms;
// @desc: recive sms from twilio send to client via websocket
// @ access: Public
app.post('/sms',async (req,res) => {
  if (Object.keys(req.body).length === 0 ) {
    return res.status(400).send()
  }
  try {
    receiveSMS(req.body)
    res.status(200).send()
  } catch (e) {
    //postSlack({ text: 'this is a test' });
    res.status(400).json({ errors: [{ msg: e }] });
  }
});

// @route: GET /sms;
// @desc: recive sms from twilio send to client via websocket
// @ access: Public
app.get('/sms_secondary', async (req,res) => {
  try {
    await receiveSMS(req.query)
    res.status(200).send()
  } catch (e) {
    //postSlack({ text: 'this is a test' });
    res.status(400).json({ errors: [{ msg: e }] });
  }
})

//repeted function of sms api call. post called is preferd but do to missing data get call is backup
const receiveSMS = async (data) => {
  console.log('running receiveSMS');
  //old call
  // let { From, To, Body } = data;
  // const property = propertyNum[To];

  // let pros = await RentLeadPros.findOne({ 'phone.phoneNumber': From })
  // if (!pros) { pros = await new RentLeadPros({ phone: { phoneNumber: From } }) };
  // let inq = await RentLeadInq.findOne({ 'listing': property, 'prospect': pros._id });
  // if (!inq) { inq = await new RentLeadInq({ prospect: pros._id, listing: property }) };
  // let chat = await ChatInq.findOne({ inq: inq._id });
  // if (!chat) { chat = await new ChatInq({ inq: inq._id }) };

  // //update open inq status to engaged
  // inq.status.currentStatus = 'engaged'
  // //update message
  // chat.messages.push({ message: Body, date: new Date(), from: 'User-SMS' });
  // //check if bot is on and if so respond
  // //if bot is not on notify team via slack
  // await pros.save();
  // await inq.save();
  // await chat.save();

  //new call
  let { To, From, Body } = data;

  //get the chat
  let chat = await Chat.findOne({from:From, to:To})
  //if no active chat see if there is an active contact for that number and start a chat
  if (!chat) { 
      const activeNum = activeNumber.find((number) => number.number === To)
      const model = activeNum.model
      //if no record save a record.... in future trigger bot to gather more info or save as unknown contact
      const fromNumber = From.slice(2)
      //not saving record (record saving line commented out below). will save chat without any owner
      //const record = await model.findOne({'phoneNumbers.number': fromNumber })
        chat = await new Chat({
          owner: record ? record._id: null,
          ownerType:activeNum.profile,
          title: record? record.fullName: null,
          subTitle: activeNum.campaign,
          unread: true,
          clientNum: From,
          routingNum: To,
          messages:[],
      })
  }
  chat.messages.push({
      sender: 'user',
      content: Body,
      userMessage: false
  })
  await chat.save()   
  //do we need to add uuid to chat?
  //const messageUuid = uuid()
  io.emit('sms', chat);  
}

//serve static assets in production
if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    const file = path.join(__dirname+'/../client/build/index.html')
    res.sendFile(file);
  });
}


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is up on port ${port}`));
