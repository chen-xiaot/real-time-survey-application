# real-time-survey-application
A responsive, single-page application using React where multiple users might simultaneously answer survey questionnaire and admin can view vote results or prompt users for new questions

## Use Cases

1. A logged admin will have a static survey (containing more than one question, each question has more than one option) and can send it to users
2. Users (no login required) will see the survey question through URL and can choose one option for each question
3. The admin side will dynamically show results after users selection
4. The admin can move to the next question, and simultaneously users can see the next question.

## Client Service Calls

1. The users will do a GET request to get questions and options
2. The users will do a POST request to send their options
3. The users will do a PUT request to update selected answers when they select other answers
4. The admin will do a GET request to get the result
5. The admin will do a POST request to move to the next question
6. The users will do a GET request to get the new question and options

## Server REST API

1. GET questions and options
`GET /topics/lilbub/questionIndex`
2. POST visitor answer
`POST /topics/lilbub/${user}${questionIndex}`
`body: { toStore: answer }`
3. PUT update visitor answer
`POST /topics/lilbub/${user}${questionIndex}`
`body: { toStore: answer }`
4. GET all answers from visitors
`GET /topics/lilbub`
5. POST current question index
`POST /${questionId}`
