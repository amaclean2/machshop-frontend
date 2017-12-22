import React, { Component } from 'react';
import HomePage from './Components/Main/HomePage';
import Login from './Components/Main/Login';
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
      failed: null
		}

    this.loginAction=this.loginAction.bind(this);
    this.logoutAction=this.logoutAction.bind(this);
    this.updateEmail=this.updateEmail.bind(this);
    this.updatePassword=this.updatePassword.bind(this);
	}

  login() {
    return (this.state.validEmail) ? <HomePage
                                url={this.state.url}
                                logout={this.logoutAction} /> :
                              <Login
                                login={this.loginAction}
                                email={this.updateEmail}
                                password={this.updatePassword}
                                addUser={this.addUser}
                                failed={this.state.failed} />;
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
    // auth.createUserWithEmailAndPassword('andrew.n.maclean@gmail.com', 'machshop').catch(function(error) {
    //   console.log('working');
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
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
