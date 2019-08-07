const mongoose = require('mongoose');

const aptSchema = new mongoose.schema({
    asset:{},
    aptNum:{},
    aptFixtures:[{}]

});

module.exports = Apt = mongoose.model('Apt', apartmentSchema);