import React, { Component } from 'react';

class OptionsInVisitorPage extends Component {
  constructor(props) {
    super(props)

    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleSelection(e.target.value)
  }

  render() {
    return (
      <div>
        <input type="radio" name="shouldBeSame" value={this.props.index} onClick={this.handleClick}/>
        <span>{this.props.index + 1}. </span>
        <span>{this.props.content}</span>
      </div>
    )
  }
}

export default OptionsInVisitorPage;
