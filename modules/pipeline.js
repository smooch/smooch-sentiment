const smooch = require('../endpoints/smooch');
const config = require('../config');

exports.setup = async () => {
  const endpoint = smooch(config.smooch);
  const { processors } = await endpoint.get('/middleware/processors');
  const { pipelines } = await endpoint.get('/middleware/pipelines');
  const active = pipelines['appuser-message'];

  for (const processor of processors) {
    const isTarget = processor.target === config.serviceUrl + '/processor';
    const isActive = active.indexOf(processor._id) !== -1;
    if (isTarget && isActive) {
      return;
    } else if (isTarget) {
      return endpoint.put('/middleware/pipelines/appuser-message', active
        .concat([ processor._id ]));
    }
  }

  const processor = await endpoint.post('/middleware/processors', {
    target: config.serviceUrl + '/processor'
  });
  console.log('PROCESSOR', processor);
  return endpoint.put('/middleware/pipelines/appuser-message', active
    .concat([ processor._id ]));
};
