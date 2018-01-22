import React, { Component } from 'react';

class OptionsInAdminPage extends Component {
  constructor(props) {
    super(props)

    this.formatInput=this.formatInput.bind(this)
  }

  formatInput(value) {
    return value.toFixed(2)
  }

  render() {
    const total = this.props.total || 0;
    const number = this.props.number || 0;
    let width = ''
    let rate = 0
    if (total === 0) {
      width = '0%' 
    } else {
      rate = this.formatInput(number / total * 100)
      width = `${rate}%`
    }
    
    return (
      <div className="result-admin">
        <span>{this.props.index + 1}. </span>
        <span>{this.props.content}</span>

        <div className="result-bar">
          <div style={{ width: `${width}` }} className="result-bar-inner">
            {rate}%
          </div>
        </div>
        
        <p>selections: {this.props.number} people</p>
      </div>
    )
  }
}

export default OptionsInAdminPage;
