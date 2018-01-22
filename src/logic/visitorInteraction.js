export const postAnswer = answer => {
  return Promise.resolve()
  .then( () => {
    return fetch('/answers', {
        method: 'POST',
        body: JSON.stringify({ toStore : answer }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    });
  })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => { console.log(json); return json; } )
  .catch( err => console.warn(err) );
}

export const getQuestionIndex = () => {
  return Promise.resolve()
  .then( () => {
    return fetch('/getQuestion', {
        method: 'GET',
    });
  })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => { console.log(json); return json; })
  .catch( err => console.warn(err) );
}