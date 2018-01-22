import React, { Component } from 'react';
import { QuestionTitle } from './QuestionTitle';
import OptionsInAdminPage from './OptionsInAdminPage';
import { getAnswerTopics, getAnswer } from '../logic/visitorSelectionGet'
import { updateQuestionIndex } from '../logic/questionIndexUpdate'
import {questionList, optionsForQuestion} from './question-option-list'

class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      questions: questionList,
      optionLists: optionsForQuestion,
      selections: {0: [0, 0, 0, 0],
                   1: [0, 0, 0, 0]},
      polls: {0: 0, 1: 0}
    }
    this.handleNext=this.handleNext.bind(this);
    this.handlePrev=this.handlePrev.bind(this);
  }

  handleNext() {
    const newIndex = this.state.questionIndex + 1;
    updateQuestionIndex(newIndex);
    this.setState( { questionIndex: newIndex } );
  }

  handlePrev() {
    const newIndex = this.state.questionIndex - 1;
    updateQuestionIndex(newIndex);
    this.setState( { questionIndex: newIndex } );
  }

  updateAnswers() {
    getAnswerTopics()
    .then( topics => {
      this.parseAnswers(topics.topics); }
    )
    .catch( err => console.warn(err) )
  }

  parseAnswers(answersArray) {
    let currAnswers = [];
    let totalPoll = 0;
    const promises = [];
    const index = this.state.questionIndex;
    for (let ans in answersArray) {
      promises.push(
        getAnswer(answersArray[ans])
        .then(answersInfo => {
          if (answersInfo.details) {
            if (answersInfo.details.whichQuestion === this.state.questionIndex) {
              const userChoosen = parseInt(answersInfo.details.whichAnswer, 10);
              currAnswers[userChoosen] = (currAnswers[userChoosen] || 0) + 1;
              totalPoll++;
            }
          }
        })
        .catch( err => console.warn(err) )
      )
    }
    Promise.all(promises)
    .then(json => {
      let currSelection = Object.assign({}, this.state.selections);
      if (currAnswers) {
        currSelection[index] = currAnswers;
      }
      let currPolls = Object.assign({}, this.state.polls);
      currPolls[index] = totalPoll;
      this.setState({selections : currSelection, polls : currPolls});})
    .catch( err => console.warn(err) ); 
  }

  componentDidMount() {
    setInterval(() => { this.updateAnswers(); }, 1500);
  }

  render() {
    return (
      <div className="admin-page">
        <header className="header">
          <h3>Hello Admin: {this.props.admin}</h3>
          <button className="logout-btn" onClick={this.props.handleLogout}>logout </button>
        </header>

        <div className="question-option-container">
          <QuestionTitle question={this.state.questions[this.state.questionIndex]}/>
          <ul className="option-container-admin">
            {this.state.optionLists[this.state.questionIndex].map( (content, index) => { return <li key={index}>
            	<OptionsInAdminPage
            	  index={index}
            	  content={content}
            	  number={this.state.selections[this.state.questionIndex][index] || 0}
                total={this.state.polls[this.state.questionIndex] || 0}
            	/>
            </li> } )}
          </ul>
          
          <div className="btn-container">
            <button className="prev-btn" onClick={this.handlePrev} disabled={this.state.questionIndex === 0}>
              Prev
            </button>        
            <button className="next-btn" onClick={this.handleNext} disabled={this.state.questionIndex === Object.keys(this.state.questions).length - 1}>
              Next
            </button>
          </div>        
        </div>
      </div>
    )
  }
}

export default AdminPage;