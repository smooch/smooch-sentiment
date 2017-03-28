const fetch = require('node-fetch');
const service = 'https://language.googleapis.com/v1beta1';

const requestFunctionGenerator = (token, method) => (path, data) => {
  return fetch(service + path + '?key=' + token, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: method === 'GET' ? undefined : JSON.stringify(data)
  })
    .then(res => res.json());
}

module.exports = token => {
  return {
    get: requestFunctionGenerator(token, 'GET'),
    post: requestFunctionGenerator(token, 'POST'),
    put: requestFunctionGenerator(token, 'PUT'),
    delete: requestFunctionGenerator(token, 'DELETE')
  };
};
