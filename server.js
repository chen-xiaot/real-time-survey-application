const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const visitorSelection = require('./src/logic/visitorSelectionSend');
const getQuestionIndex = require('./src/logic/questionIndexLoad')
const port = 8000;
let token = '';
let user = '';
let hasChoosen = { 0 : false, 1 : false };

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }));

app.post('/answers', ( request, response ) => {
  console.log(request.body.toStore);
  postAnswer(request.body.toStore)
});

app.get('/getQuestion', ( request, response ) => {
  if (!this.token) {
    visitorSelection.login()
    .then(loginInfo => {
      this.token=`userToken=${loginInfo.token}`;
      this.user=uuid();
      getQuestionIndex(this.token)
      .then(indexInfo => {response.send(JSON.stringify(indexInfo.details))})
      .catch( err => console.warn(err) );
    })
    .catch( err => console.warn(err) );
  } else {
    getQuestionIndex(this.token)
    .then(indexInfo => {response.send(JSON.stringify(indexInfo.details))})
    .catch( err => console.warn(err) );
  }
});

const postAnswer = (visitorAnswer) => {
  if (!this.token) {
    visitorSelection.login()
    .then(loginInfo => {
      this.token=`userToken=${loginInfo.token}`;
      this.user=uuid();
      visitorSelection.send(visitorAnswer, this.token, this.user);
      hasChoosen[visitorAnswer.whichQuestion]=true;
    })
    .catch( err => console.warn(err) );
  } else if (hasChoosen[visitorAnswer.whichQuestion]) {
    visitorSelection.update(visitorAnswer, this.token, this.user);
  } else {
    visitorSelection.send(visitorAnswer, this.token, this.user);
    hasChoosen[visitorAnswer.whichQuestion]=true;
  }
};

app.listen(port, function() { console.log(`
Webserver running on port ${port}
You can go to http://localhost:${port}/
`); });
