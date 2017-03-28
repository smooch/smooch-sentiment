const config = require('../config');
const google = require('../endpoints/google');

const getFace = score => {
  if (score > .75) return '😁';
  if (score > .5) return '😀';
  if (score > .25) return '🙂';
  if (score > -.25) return '😐';
  if (score > -.5) return '😕';
  if (score > -.75) return '😔';
  return '😖';
}

module.exports = content => {
  const data = {
    document:{
      type:'PLAIN_TEXT',
      content,
    },
    encodingType:'UTF8'
  };
  return google(config.google.key).post('/documents:analyzeSentiment', data)
    .then(sentimentData => {
      const sentiment = sentimentData.documentSentiment;
      const face = getFace(sentiment.score);
      return {
        sentimentScore: sentiment.score,
        sentimentMagnitude: sentiment.magnitude,
        sentimentPolarity: sentiment.polarity,
        sentimentFace: face
      };
    });
};
