const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    job:{},
    type:{},
    subType:{},
    reqSum:{},
    openDate:{},
    status:{},
    avail:{},
    log:[{}]

});

module.exports = Task = mongoose.model('Task', taskSchema);