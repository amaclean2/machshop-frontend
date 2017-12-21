import React, { Component } from 'react';
import HomePage from './Components/Main/HomePage';
import Login from './Components/Main/Login';
import { auth, provider } from './firebase';

class App extends Component {
	constructor() {
		super();
		this.state={
			url: (window.location.href.substr(0, 5) === 'http:' ) ? 'http://localhost:3001/api' : 'https://machapi.herokuapp.com/api',
      userEmail: '',
      user: null
		}

    this.loginAction=this.loginAction.bind(this);
	}

  login() {
    console.log(provider);
    return (this.state.user) ? <HomePage url={this.state.url} /> : <Login login={this.loginAction} />
  }

  loginAction() {
    auth.signInWithPopup(provider)
      .then( result => {
        const user = result.user;
        this.setState({ user });
        console.log('result', result);
      })
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
