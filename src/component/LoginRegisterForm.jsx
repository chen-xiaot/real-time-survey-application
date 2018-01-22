import React from 'react';

class LoginRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {invalidUsername: false, invalidPassword: false};
    this.updateUsername=this.updateUsername.bind(this);
    this.updatePassword=this.updatePassword.bind(this);
    this.onLogin=this.onLogin.bind(this);
    this.onRegister=this.onRegister.bind(this);
    this.onSkip=this.onSkip.bind(this);
  }

  updateUsername(e) {
    const validUsername = /^[A-Za-z0-9]+$/;
    if (!e.target.value.match(validUsername)) {
      this.setState( { invalidUsername: true } );
    } else {
      this.setState( { invalidUsername: false } );
      this.setState({username: e.target.value});
    }
  }

  updatePassword(e) {
    if (e.target.value.indexOf(' ') >= 0) {
      this.setState( { invalidPassword: true } );
    } else {
      this.setState( { invalidPassword: false } );
      this.setState({password: e.target.value});
    }
  }

  onLogin() {
    this.setState({
      password: ''
    });
    const { username, password } = this.state;
    this.props.onLogin({ username, password });
  }

  onRegister() {
    const { username, password } = this.state;
    this.props.onRegister({ username, password });    
  }

  onSkip() {
    this.props.onSkip();
  }

  render() {
    return (
      <div className='login-form'>
        <input className='login-input' onChange={this.updateUsername} placeholder="Username"/>
        <input className='login-input' onChange={this.updatePassword} placeholder="Password"/>
        <button className='login-btn' onClick={this.onLogin} disabled={!this.state.username || !this.state.password || this.state.invalidUsername || this.state.invalidPassword}> Admin Login </button>
        <button className='login-btn' onClick={this.onRegister} disabled={!this.state.username || !this.state.password || this.state.invalidUsername || this.state.invalidPassword}> Admin Register </button>
        <button className='login-btn' onClick={this.onSkip}> Visitor Skip </button>
        <p className='login-info'>{this.props.error ? this.props.error : null}</p>
        <p className='login-info'>{this.state.invalidUsername ? 'invalid username (only letter and number allowed) ' : null}</p>
        <p className='login-info'>{this.state.invalidPassword ? 'invalid password (no space allowed) ' : null}</p>
      </div>
    );
  }
}

export default LoginRegisterForm;