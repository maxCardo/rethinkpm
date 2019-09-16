const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const dbConnect = require('./db/db');

const app = express();
app.use(cookieParser());

dbConnect();

//Init middle ware. replaces bodyParser
app.use(express.json({extended:false}));

//api routes
app.use('/api/users', require('./api/users'));
app.use('/api/rent_lead', require('./api/rentLead'));
app.use('/api/3ps', require('./api/3ps'));


//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up on port ${port}`));
