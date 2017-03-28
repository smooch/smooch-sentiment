const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const service = 'https://api.smooch.io/v1';

const getToken = creds => jwt.sign({ scope: 'app' }, creds.secret, {
    header: {
        typ: 'JWT',
        kid: creds.keyId,
        alg: 'HS256'
    }
});

const requestFunctionGenerator = (token, method) => (path, data) => {
  return fetch(service + path, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: method === 'GET' ? undefined : JSON.stringify(data)
  })
    .then(res => res.json());
}

module.exports = creds => {
  const token = creds.nonce || getToken(creds);
  return {
    get: requestFunctionGenerator(token, 'GET'),
    post: requestFunctionGenerator(token, 'POST'),
    put: requestFunctionGenerator(token, 'PUT'),
    delete: requestFunctionGenerator(token, 'DELETE')
  };
};
