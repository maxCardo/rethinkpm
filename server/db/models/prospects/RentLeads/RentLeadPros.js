const rentLeadProsSchema = new mongoose.Schema({
    createDate: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        phoneNumber: {
            type: Number,
            unique: true
        },
        phoneType: {
            type: String
        },
    },

    chat: {
        botOn: {
            type: Boolean,
            default: true
        },
        messages: [{
            from: {
                type: String
            },
            message: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            },
            unread: {
                type: Boolean,
                default: true
            }
        }],
    },
    notes: [{
        note: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],

    inquiries: [{
        inquary: {
            type: String
        }
    }],


});

module.exports = RentLeadPros = mongoose.model('RentLeadPros', rentLeadProsSchema);
