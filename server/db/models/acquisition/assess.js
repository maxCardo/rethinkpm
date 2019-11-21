const mongoose = require('mongoose');

const assessSchema = new mongoose.Schema({
  mlsNum:{
    type: String,
    required: true
  },
  inspectDate:{
    type: Date,
    default: Date.now()
  },
  agent:{},
  locationRate:{
    neighborhood:{
      walkScore:{},
      multiFamRate:{}
    },
    Block:{
      locConditions:{

      },
      geoConsitions:{

      }
    },
    parking:{}

  },
  property:{
    isVacant:{
      type:Boolean,
    },
    currentRent:{
      type:Number
    },
    exterior:{
      exteriorCondition: {
        type:String,
      },
      roof:{
        mtType:{
          type:String
        },
        condition:{
          type:String
        },
        age:{
          type:Number
        },
        isLeaking:{
          type:Boolean
        },
        gutters:{}
      },
      HardScape:{
        sideWalks:{},
        walkUp:{},
        railings:{},
        kneeWall:{},
        deck:{}, //can be multible
        retainingWall:{}
      },
      siding:{},
      windows:{},
      exteriorDoors:{}, //can  be multible
      landscape:{}

    },
  },
  //------------------------------------------------------------
    
  hvac:{},

  notes:[{
    note:{},
    date:{}
  }]


});

module.exports = Assess = mongoose.model('Assess', assessSchema);
