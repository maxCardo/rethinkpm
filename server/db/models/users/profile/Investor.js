const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
    user:{},
    address:{},
    currentAssets:{},
    // aquasition stratigy to include aquAssums. can have multible assums for differesnt asseet types classes
    //aquStrat:[],



});

module.exports = Investor = mongoose.model('Investor', investorSchema);