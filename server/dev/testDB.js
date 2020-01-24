const {MongoClient} = require('mongodb');
const RentLeadPros = require('../db/models/prospects/RentLeads/RentLeadPros');
const RentLeadInq = require('../db/models/prospects/RentLeads/RentLeadInq');
const {validateNum} = require('../3ps/sms');
const dataBase = process.env.MONGO_DB_TEST_URI;

const loadTestDB = async () => {
    MongoClient.connect(
        dataBase,
        {useNewUrlParser: true},
        async (err, client) => {
            if (err) {
                return console.log(
                    'Error: problem connecting to mongoDB getVendor'
                );
            }
            const db = client.db();
            const data = await db
                .collection('chats')
                .find({})
                .sort({last_active: -1})
                .limit(100)
                .toArray();

            //map through data
            const statusType = [
                'new',
                'engaged',
                'scheduled',
                'toured',
                'application',
                'cold',
            ];
            let statusCount = 0;
            data.map(async (record) => {
                const {
                    name,
                    email,
                    phoneNumber,
                    last_active,
                    property = 'test1',
                    chats,
                } = record;
                const propArr = [
                    '1500 Fallowfield Avenue',
                    '1415 Rutherford Avenue #2',
                    '3349 Bookman Avenue',
                ];
                propArr.includes(property) ? null : (property = 'test2');
                let pros = await new RentLeadPros({
                    name,
                    email,
                    phone: {phoneNumber},
                    createDate: last_active,
                });
                // validate phone number
                if (phoneNumber)
                    pros.phone.phoneType = await validateNum(phoneNumber);
                //create Inq
                statusCount >= 5 ? (statusCount = 0) : statusCount++;
                const inq = await new RentLeadInq({
                    prospect: pros._id,
                    DateInq: last_active,
                    status: {
                        currentStatus: statusType[statusCount],
                    },
                    listing: property,
                });
                //if chat exist create chat
                console.log('chats: ', chats.length);
                if (chats.length > 1) {
                    let chat = await new ChatInq({
                        inq: inq._id,
                        messages: chats,
                        unread: false,
                    });
                    chat.save();
                }
                pros.save();
                inq.save();
            });

            console.log('script completed');
        }
    );
};

module.exports = {loadTestDB};
