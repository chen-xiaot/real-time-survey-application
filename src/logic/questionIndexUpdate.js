export const updateQuestionIndex = index => {
  return Promise.resolve()
    .then( () => {
      return fetch('http://sea-info6250-crud.herokuapp.com/topics/lilbub/questionIndex',{
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({ toStore : index }),
      });
    })
  .then( response => response.ok ? response.json() : response.json().then( err => Promise.reject(err)) )
  .then( json => { console.log(json); return json })
  .catch( err => console.warn(err) );
}