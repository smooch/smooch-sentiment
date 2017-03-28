require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  serviceUrl: process.env.SERVICE_URL,
  google: {
    key: process.env.GOOGLE_CLOUD_API_KEY
  },
  smooch: {
    keyId: process.env.SMOOCH_KEY_ID,
    secret: process.env.SMOOCH_SECRET
  }
};
