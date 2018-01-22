const fetch = require('node-fetch');

const getQuestionIndex = (token) => {
  console.log("I am in ggetQuestionIndex from herokuapp")
  return Promise.resolve()
    .then( () => {
      return fetch('http://sea-info6250-crud.herokuapp.com/topics/lilbub/questionIndex',{
        method: 'GET',
        headers: { 'Cookie' : token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json' }
      });
    })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => { console.log(json); return json })
  .catch( err => console.warn(err) );
}

module.exports = getQuestionIndex;
