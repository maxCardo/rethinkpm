// cron docs: https://www.npmjs.com/package/node-cron
const cron = require('node-cron');

const inq = require('../db/models/prospects/RentLeads/RentLeadInq');

// @sch: Daily Sun - Fri 12:30pm & 6:30pm;
// @desc: follow up on "new" contacts that have not engaged with chat
cron.schedule(' 34 12,18 * * 0-5', async () => {
    //query DB and find new inqueries
    const newLeads = await inq
        .find({'status.currentStatus': 'new'})
        .populate('prospect');
    //loop through and send email or text
    newLeads.map(async (lead) => {
        let {
            prospect: {
                phone: {phoneType},
            },
            notes,
        } = lead;
        phoneType === 'mobile' ? console.log('call: ') : console.log('email:');
        notes.unshift({
            note: `Auto follow up via ${
                phoneType === 'mobile' ? 'sms' : 'email'
            }`,
        });
        //update and save record
        lead.status.new.numFlwUps = (await lead.status.new.numFlwUps) + 1;
        let {
            status: {
                new: {numFlwUps},
            },
        } = lead;

        if (
            (phoneType === 'mobile' && numFlwUps >= 4) ||
            (phoneType != 'mobile' && numFlwUps >= 1)
        ) {
            lead.status.currentStatus = 'cold';
            notes.unshift({
                note: `updated current status to cold after ${numFlwUps} tries to contact`,
            });
        }
        console.log(lead);
        await lead.save();
    });
});
