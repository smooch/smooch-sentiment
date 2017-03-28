[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This Smooch message processor uses Google Cloud NLP to detect sentiment. The sentiment is added as metadata to the message (along with an emoji representation).

This is an example of a Smooch message payload containing sentiment metadata:

```json
{
  "metadata": {
    "sentimentFace": "😀",
    "sentimentPolarity": 1,
    "sentimentMagnitude": 0.7,
    "sentimentScore": 0.7
  },
    "text": "Because I'm happy, Clap along if you feel like happiness is the truth.",
    "type": "text",
    "role": "appUser",
    "received": 1490712978.27,
    "authorId": "58299436874ed1abb9717264",
    "name": "Anastasi Theodore",
    "_id": "58da79925d35374e008b9fc6",
    "source": {
        "type": "web",
        "id": "d0f0d815087b4f749dadc59d56ebc6f8"
    },
    "id": "58da79925d35374e008b9fc6"
}
```

Here's a screenshot of a message with the sentiment metadata displayed below the original message:

![screen shot 2017-03-28 at 11 28 53 am](https://cloud.githubusercontent.com/assets/2235885/24414081/5418a618-13ab-11e7-9ffd-559d434aa5ee.png)

This screenshot was created using an open source reference implementation of Smooch, [Smooch-Desk](https://github.com/smooch/smooch-desk).

This code is a proof of concept only. **This is not production quality software**. It can be used as a reference to create your own implementation.
