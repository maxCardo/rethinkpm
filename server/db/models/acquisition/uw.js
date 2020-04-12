//user appetite for underwiting assumptions
const uwSchema = new mongoose.Schema({
  deal:{
    askingPrice:{},
    investmentValue:{},
    //ask to value,
    initalCapEx:{},
    AvgRent:{},
    occupany:{},
    numUnits:{},
    opexRatio:{},
    controlableExp:{},
    utilities:{},
    insurance:{},
    taxes:{},
    leaseTradeOut:{
      marketGrowth:{},
    },


  },



});

module.exports = UW = mongoose.model('UW', uwSchema);
