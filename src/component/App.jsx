import React, { Component } from 'react';
import '../style/App.css';
import { login, isLoggedIn, logout, register, userPromote }  from '../logic/user-status';
import LoginRegisterForm from './LoginRegisterForm';
import AdminPage from './AdminPage';
import VisitorPage from './VisitorPage';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isVisitor: false, loggedIn: false };
    this.submitLogin=this.submitLogin.bind(this);
    this.submitRegister=this.submitRegister.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.handleVisitorSkip=this.handleVisitorSkip.bind(this);
  }

  componentDidMount() {
    isLoggedIn()
    .then( isLoggedInInfo => {
      if (isLoggedInInfo.userLevel) {
        if (isLoggedInInfo.userLevel === 'normal') {
          this.setState( { loggedIn: false } )
        } else {
          this.setState( { loggedIn: true, user: isLoggedInInfo.username } )
        }
      }
    });
  }

  submitLogin({ username, password }) {
    login(username, password)
    .then( loginInfo => {
      if (loginInfo.userLevel) {
        if (loginInfo.userLevel === 'normal') {
          this.setState( { error: 'this user is not admin' } )
        } else {
          this.setState({
            loggedIn: true,
            user: loginInfo.username,
            error: ''
          });
          document.cookie=`userToken=${loginInfo.token}`;
        }        
      } else {
        this.setState({error : loginInfo.error});
      }
    });
  }

  submitRegister({ username, password }) {
    register(username, password)
    .then( registerInfo => {
      if(!registerInfo.error){
        this.setState({
          loggedIn: true,
          user: registerInfo.username
        });
        document.cookie=`userToken=${registerInfo.token}`;
        userPromote(username)
        .then(json => {console.log(json);})
        .catch(err => {console.log(err);});
      } else {
        this.setState({error : registerInfo.error});
      }
    });
  }

  handleLogout() {
    logout(this.state.user)
    .then( logoutInfo => {
      this.setState({
        loggedIn: false,
        user: ''
      });
      document.cookie=`userToken=${logoutInfo.token}`;
    });
  }

  handleVisitorSkip() {
    this.setState( { isVisitor: true } );
  }

  render() {
    return (
      <div className="App">
        {this.state.isVisitor || this.state.loggedIn ? 
          this.state.isVisitor ? 
            <VisitorPage /> : 
            <AdminPage admin={this.state.user} handleLogout={this.handleLogout} /> : 
          <LoginRegisterForm onSkip={this.handleVisitorSkip} onLogin={this.submitLogin} onRegister={this.submitRegister} error={this.state.error} />
        }
      </div>
    );
  }
}

export default App;