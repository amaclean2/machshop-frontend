import React, { Component } from 'react';
import HomePage from './Components/Main/HomePage';
import Login from './Components/Main/Login';
import CreateUser from './Components/Main/CreateUser';
import { auth } from './firebase';

class App extends Component {
	constructor() {
		super();
		this.state={
			url: (window.location.href.substr(0, 5) === 'http:' ) ? 'http://localhost:3001/api' : 'https://machapi.herokuapp.com/api',
      user: null,
      email: '',
      password: '',
      validEmail: null,
      failed: null,
      createUser: false,
      userInfo: [],
      finished: false
		}

    this.loginAction=this.loginAction.bind(this);
    this.logoutAction=this.logoutAction.bind(this);
    this.updateEmail=this.updateEmail.bind(this);
    this.updatePassword=this.updatePassword.bind(this);
    this.createUser=this.createUser.bind(this);
    this.createUserInfo=this.createUserInfo.bind(this);
    this.addUser=this.addUser.bind(this);
	}

  createUserInfo(e) {
    let info = this.state.userInfo;
    switch(e.target.name) {
      case 'name' :
        info.displayName = e.target.value;
        break;
      case 'cname' :
        info.companyName = e.target.value;
        break;
      case 'email' :
        info.email = e.target.value;
        break;
      case 'verifyEmail' :
        info.vmail = e.target.value;
        break;
      case 'pass' :
        info.password = e.target.value;
        break;
      case 'verifyPass' :
        info.vword = e.target.value;
        break;
      default :
        return;
    }
  }

  createUser() {
    this.setState({ createUser: !this.state.createUser, failed: false });
  }

  login() {
    if(this.state.validEmail) {
      return <HomePage
                url={this.state.url}
                logout={this.logoutAction} />
    } else {
      if(this.state.createUser) {
        return <CreateUser
                  addUser={this.addUser}
                  createUser={this.createUser}
                  createUserInfo={this.createUserInfo}
                  finished={this.state.finished}
                  failed={this.state.failed} />
      } else {
        return <Login
                login={this.loginAction}
                email={this.updateEmail}
                password={this.updatePassword}
                createUser={this.createUser}
                failed={this.state.failed} />
      }
    } 
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  loginAction() {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then( result => {
        this.setState({ validEmail: result.email, password: null });
      }).catch( error => {
        this.setState({failed: error.code});
      })
  }

  addUser() {
    let info = this.state.userInfo;
    if(!info.displayName || !info.companyName || !info.email || !info.vmail || !info.password || !info.vword) {
      this.setState({ failed: 'all fields must be filled in' });
    } else {
      if(info.vmail !== info.email || info.password !== info.vword) {
        this.setState({failed: 'verify email or verify password must match'});
      } else {
        auth.createUserWithEmailAndPassword(info.email, info.password)
          .then( response => {
            var user = auth.currentUser;
            user.updateProfile({
              displayName: info.displayName
            }).then( response => {
              user.sendEmailVerification().then( () => {
                // post user data;
                // this.post();
                this.setState({ finished: true });
                console.log('email sent');
              }).catch( error => {
                this.setState({ failed: 'invalid email'});
                console.log('email not sent: ', error);
              });
            }).catch( error => {
              this.setState({ failed: error.code });
            })
          }).catch( error => {
            this.setState({ failed: error.code });
          });
      }
    }
  }

  logoutAction() {
    auth.signOut()
      .then( () => {
        this.setState({ validEmail: null });
      });
  }

  render() {
    let login = this.login();
    return (
      <div className="App">
        {login}
      </div>
    );
  }
}

export default App;
