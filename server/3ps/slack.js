const axios = require('axios');
const config = require('./../config/creds');

// leasing bot hook
const hook = config.slackWebHook;
// post to slack

const postSlack = async (record) => {
    const slackBody = { text: record.text };

    try {
        await axios.post(
            `https://hooks.slack.com/services/${hook}`,
            slackBody,
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error posting to Slack:', error);
    }
};

module.exports = { postSlack };