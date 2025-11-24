const axios = require('axios')
const {dcordMaintHook, dcordWeBuyHook, dcordLseHook} = require('../config/creds')

const postDiscord = (record, hook ) => {
    let channel
    switch (hook) {
      case 'weBuy':
        channel = dcordWeBuyHook
        break;
      case 'lease':
        channel = dcordLseHook
        break;
      case 'maint':
        channel = dcordMaintHook
        break;
      default:
        channel = dcordWeBuyHook
        break;
    } 
    const postBody = {content: record};
    axios({
      url: `https://discord.com/api/webhooks/${channel}`,
      method: 'post',
      data: postBody,
    });
    console.log('bug fix with discord not posting till webhook is updated+')
}

module.exports = {postDiscord}