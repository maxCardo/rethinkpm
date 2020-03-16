const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const trigger = require('./triggers/rentLead');
const dbConnect = require('./db/db');
const RentLeadPros = require('./db/models/prospects/RentLeads/RentLeadPros');
const RentLeadInq = require('./db/models/prospects/RentLeads/RentLeadInq');
const ChatInq  = require('./db/models/prospects/RentLeads/chat');
const { postSlack } = require('./3ps/slack');
//ToDo: change to call to DB once property table is created
const { propertyNum } = require('./3ps/calandly');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');
const uuid = require('uuid/v1');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());


dbConnect();

//Init middle ware. replaces bodyParser
app.use(express.json({extended:false}));

//api routes
app.use('/api/users', require('./api/users'));
app.use('/api/rent_lead', require('./api/rentLead'));
app.use('/api/tasks', require('./api/tasks'));
app.use('/api/3ps',(req,res,next) => {req.io = {io:io}, next()}, require('./api/3ps'));


//Socket.io socket and API calls
require('./socket/chat')(io);


// @route: Post /sms;
// @desc: recive sms from twilio send to client via websocket
// @ access: Public
app.post('/sms',async (req,res) => {
  if (Object.keys(req.body).length === 0 ) {
    return res.status(400).send()
  }
  try {
    console.log('post call works!');
    await receiveSMS(req.body)
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

  let { From, To, Body } = data;
  const property = propertyNum[To];

  let pros = await RentLeadPros.findOne({ 'phone.phoneNumber': From })
  if (!pros) { pros = await new RentLeadPros({ phone: { phoneNumber: From } }) };
  let inq = await RentLeadInq.findOne({ 'listing': property, 'prospect': pros._id });
  if (!inq) { inq = await new RentLeadInq({ prospect: pros._id, listing: property }) };
  let chat = await ChatInq.findOne({ inq: inq._id });
  if (!chat) { chat = await new ChatInq({ inq: inq._id }) };

  //update open inq status to engaged
  inq.status.currentStatus = 'engaged'
  //update message
  chat.messages.push({ message: Body, date: new Date(), from: 'User-SMS' });
  //check if bot is on and if so respond
  //if bot is not on notify team via slack
  await pros.save();
  await inq.save();
  await chat.save();

  //postSlack({ text: 'this is a test' });
  const messageUuid = uuid()
  io.emit('sms', { chat_id: chat._id, message: Body, uuid: messageUuid });  
}

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    const file = path.join(__dirname+'/../client/build/index.html')
    res.sendFile(file);

  });
}


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is up on port ${port}`));
