// cron docs: https://www.npmjs.com/package/node-cron
const cron = require('node-cron');


// @sch: Daily Sun - Fri 12:30pm & 5:30pm;
// @desc: follow up on "new" contacts that have not engaged with chat
cron.schedule(' 30 12,15 * * 0-5', () => {
  console.log('run at 12:30p');

  //query DB and find new inqueries
  
  //loop through and send email or text

  //update and save record

});




