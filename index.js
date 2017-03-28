const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pipeline = require('./modules/pipeline');
const processor = require('./modules/processor');

express()
  .get('/', (req, res) => res.send('Welcome to Smooch-Translation.'))
  .post('/processor', bodyParser.json(), processor)
  .post('/hook', bodyParser.json(), (req, res) => {
    console.log('MESSAGE', JSON.stringify(req.body, null, 4));
    res.end();
  })
  .listen(config.port, () => {
    console.log('Listening on', config.port);
    pipeline.setup()
      .then(data => {
        if (data && data.error) {
          throw new Error(data.error.description);
        }
      })
      .catch(err => {
        console.log('Failed to complete setup', err);
        throw err;
      });
  });
