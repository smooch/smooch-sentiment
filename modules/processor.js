const smooch = require('../endpoints/smooch');
const analyze = require('./analyze');
const config = require('../config');

module.exports = async (req, res) => {
  try {
    const text = req.body.message.text;
    const appId = req.body.app._id;
    const nonce = req.body.nonce;

    const metadata = await analyze(text);

    await smooch({ nonce }).post('/middleware/continue', { metadata });
    res.end();
  } catch(err) {
    console.log('ERROR IN HANDLER', err);
    res.status(500).send(err.message);
  }
};
