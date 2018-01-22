export const getAnswerTopics = () => {
  return Promise.resolve()
  .then( () => {
    return fetch('//sea-info6250-crud.herokuapp.com/topics/lilbub',{
      method: 'GET',
      credentials: 'include',
    });
  })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => {console.log('I am in getAnswerTopics now '); console.log(json); return json })
  .catch( err => console.warn(err) );
};

export const getAnswer = (topics) => {
  return Promise.resolve()
  .then( () => {
    return fetch(`//sea-info6250-crud.herokuapp.com/topics/lilbub/${topics}`,{
      method: 'GET',
      credentials: 'include',
    });
  })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => {console.log('I am in getAnswer now '); console.log(json); return json })
  .catch( err => console.warn(err) );
};