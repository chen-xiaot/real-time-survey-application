import React, { Component } from 'react';
import {QuestionTitle} from './QuestionTitle';
import OptionsInVisitorPage from './OptionsInVisitorPage';
import { getQuestionIndex, postAnswer } from '../logic/visitorInteraction'
import {questionList, optionsForQuestion} from './question-option-list'

class VisitorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      questions: questionList,
      optionLists: optionsForQuestion,
      visitorAnswer: {'whichQuestion': null, 'whichAnswer': null}
    }
    this.updateAnswer=this.updateAnswer.bind(this)
    this.handleGetQuestion=this.handleGetQuestion.bind(this)
  }

  updateAnswer(value) {
    const index = this.state.questionIndex;
    const newResult = {'whichQuestion': index, 'whichAnswer': value}
    postAnswer(newResult)
    this.setState( { visitorAnswer: newResult } )
  }

  handleGetQuestion() {
    getQuestionIndex()
    .then(indexInfo => {
      this.setState({ questionIndex : indexInfo })
    })
    .catch(err => {console.log(err);})
  }

  componentDidMount() {
    setInterval(() => { 
      this.handleGetQuestion();
    }, 1000);
  }

  render() {
    return (
      <div className="visitor-page">
        <header className='header'>
          <h3>Hello Visitor</h3>
        </header>
        <div className="question-option-container">
          <QuestionTitle question={this.state.questions[this.state.questionIndex]}/>

          <ul className="option-container-visitor">
            {this.state.optionLists[this.state.questionIndex].map( (content, index) => { return <li key={index}>
            	<OptionsInVisitorPage
            	  index={index}
            	  content={content}
                handleSelection={this.updateAnswer}
            	/>
            </li> } )}
          </ul>
        </div>
      </div>
    )
  }
}

export default VisitorPage;