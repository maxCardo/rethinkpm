require('dotenv').config();

module.exports = {
  mongoURI:process.env.MONGO_DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  twlsid: process.env.TWLS_ID,
  twlAuthToken: process.env.TWL_AUTH_TOKEN,
  gmlAcct: process.env.GML_ACCT,
  gmlPass: process.env.GML_PASS,
  smtpPass: process.env.SMTP_PASS,
  smtpAcct: process.env.SMTP_ACCT,
  smtpHost: process.env.SMTP_HOST,
  host: process.env.APP_HOST,
  slackWebHook: process.env.SLACK_MEETMAX_WEBHOOK,
  testNum: process.env.TEST_PHONE_NUM,
  testEmail: process.env.TEST_EMAIL,
  idxPartnerID: process.env.IDX_PARTNER_ID,
  idxClientID: process.env.IDX_CLIENT_ID,
  idxSearchID: process.env.IDX_SEARCH_ID,
  sendGridKey: process.env.SENDGRID_API_KEY
}
