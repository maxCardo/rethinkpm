const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const trigger = require('./triggers/rentLead');
const dbConnect = require('./db/db');
const pros = require('./db/models/prospects/RentLeads/RentLeadPros');
const inq = require('./db/models/prospects/RentLeads/RentLeadInq');
const {postSlack} = require('./3ps/slack');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');

app.use(cors());
app.use(cookieParser());

dbConnect();

//Init middle ware. replaces bodyParser
app.use(express.json({extended: false}));

//api routes
app.use('/api/users', require('./api/users'));
app.use('/api/rent_lead', require('./api/rentLead'));
app.use(
    '/api/3ps',
    (req, res, next) => {
        (req.io = {io: io}), next();
    },
    require('./api/3ps')
);

app.get('/', (req, res) => {
    res.send('Hello World');
});

//Socket.io socket and API calls
require('./socket/chat')(io);

// @route: Post /sms;
// @desc: recive sms from twilio send to client via websocket
// @ access: Public
app.post('/sms', async (req, res) => {
    let {From} = req.body;

    try {
        //get user based on from #
        //get property inquiring about via "from" number
        //check for active inq for that property/user update status to engageed,

        //if one no user or inq found? why would this be??

        //emit incoming sms to UI

        //send to dialogflow await response,
        //send DF res via sms,
        //emit res to ui,
        //send incoming sms to slack if fail, etc

        const lead = await pros.findOne({'phone.phoneNumber': From});
        const allInqs = await inq.find({prospect: lead._id});
        //TO DO: need to understand what listing they are contacting we can do this by having dedicated numbers for each listing
        console.log(allInqs);
        //update open inq status to engaged
        allInqs.map((lead) => {
            lead.status.currentStatus = 'engaged';
            lead.save();
        });
        //check if bot is on and if so respond
        //if bot is not on notify team via slack
        //postSlack({ text: 'this is a test' });
        io.emit('test', {msg: 'test message from api from main page'});
        res.send(From);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({errors: [{msg: e}]});
    }
});

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is up on port ${port}`));
