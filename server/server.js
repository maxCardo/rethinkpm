const express = require('express');
const path = require('path');

const dbConnect = require('./db/db');

const app = express();

dbConnect();

//Init middle ware. replaces bodyParser
app.use(express.json({extended:false}));

//api routes
app.use('/api/users', require('./api/users'));

app.get('/test', (req, res) => {
  console.log('request');
})

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up on port ${port}`));
