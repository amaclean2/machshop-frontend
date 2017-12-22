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
    this.post=this.post.bind(this);
	}

  post() {

    let request = new Request(this.state.url + '/users', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        name: this.state.userInfo.displayName,
        company_name: this.state.userInfo.companyName ? this.state.userInfo.companyName : '',
        company_id: this.state.userInfo.companyId,
        email: this.state.userInfo.email
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).catch( error => {
      console.log(error);
    }).then( data => {
      console.log(data);
    });
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
      case 'cid' :
        info.companyId = e.target.value;
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

  componentDidMount() {
    let cachedVars = sessionStorage.getItem('user');
    if(cachedVars)
      this.setState({ validEmail: cachedVars });
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
        fetch(this.state.url + '/users')
          .then( response => { return response.json(); }).then( data => {
            let company = data.filter( item => { return item.email === result.email })[0].company_id;
            sessionStorage.setItem('user', [ result.email, company ]);
            this.setState({ validEmail: result.email, password: null });
          });
      }).catch( error => {
        this.setState({failed: error.code});
      })
  }

  addUser() {
    let info = this.state.userInfo;
    if(!info.displayName || !info.companyId || !info.email || !info.vmail || !info.password || !info.vword) {
      this.setState({ failed: 'required fields must be filled in' });
    } else {
      if(info.vmail !== info.email) {
        this.setState({failed: 'verify email must match email'});
      } else {
        if(info.password !== info.vword) {
          this.setState({failed: 'verify password must match password'});
        } else {
          auth.createUserWithEmailAndPassword(info.email, info.password)
            .catch( error => {
              this.setState({ failed: error.code });
            }).then( response => {
              var user = auth.currentUser;
              user.updateProfile({
                displayName: info.displayName
              }).catch( error => {
                this.setState({ failed: error.code });
              }).then( response => {
                user.sendEmailVerification().then( () => {
                  // post user data;
                  this.post();
                  this.setState({ finished: true });
                }).catch( error => {
                  console.log(error);
                  this.setState({ failed: 'invalid email'});
                });
              });
            });
        }
      }
    }
  }

  logoutAction() {
    auth.signOut()
      .then( () => {
        sessionStorage.clear();
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
