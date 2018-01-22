const fetch = require('node-fetch');

const sendAnswertoHeroku = (visitorAnswer, token, user) => {
  console.log(visitorAnswer);
  const index = visitorAnswer.whichQuestion;
  console.log('I am in sendAnswertoHeroku now and user is' + user)
  const topic = "ans." + index + "." + user;
  return Promise.resolve()
    .then( () => {
      return fetch(`http://sea-info6250-crud.herokuapp.com/topics/lilbub/${topic}`,{
        method: 'POST',
        body: JSON.stringify({ toStore : visitorAnswer }),
        headers: { 'Cookie' : token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json' }
 
      });
    })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => {console.log('I am in sendAnswertoHeroku now '); console.log(json); return json })
  .catch( err => console.warn(err) );
}

const updateAnswertoHeroku = (visitorAnswer, token, user) => {
  console.log('I am in updateAnswertoHeroku now and user is' + user)
  const topic = "ans." + visitorAnswer.whichQuestion + "." + user;
  return Promise.resolve()
    .then( () => {
      return fetch(`http://sea-info6250-crud.herokuapp.com/topics/lilbub/${topic}`,{
        method: 'PUT',
        body: JSON.stringify({ toStore : visitorAnswer }),
        headers: { 'Cookie' : token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json' }
      });
    })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => {console.log('I am in sendAnswertoHeroku now '); console.log(json); return json })
  .catch( err => console.warn(err) );
}

const visitorLogin = () => {
  return Promise.resolve()
  .then( () => {
    return fetch('http://sea-info6250-crud.herokuapp.com/users/lilbub/admin/session',{
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
      body: JSON.stringify({ password: 'lilbub' })
    });
  })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => {console.log('I am in visitorLogin now ');console.log(json); return json} ) 
  .catch( err => console.warn(err) );
};

module.exports = { send :sendAnswertoHeroku, update : updateAnswertoHeroku, login :  visitorLogin };
