import React, { Component } from 'react';
import HomePage from './Components/Main/HomePage';
import Login from './Components/Main/Login';
import CreateUser from './Components/Main/CreateUser';
import CreateUserBio from './Components/Main/CreateUserBio';
import ResetPassword from './Components/Main/ResetPassword';
import * as fluxActions from './Flux/actions';

import { auth } from './firebase';

class App extends Component {
	constructor() {
		super();
		this.state={
      user: null,
      email: '',
      password: '',
      validEmail: null,
      failed: null,
      createUser: false,
      userInfo: [],
      finished: false,
      resetPassword: false,
      newCompanyName: null,
      title: 'ToolBox',
      createUserBio: false
		}

    this.loginAction=this.loginAction.bind(this);
    this.logoutAction=this.logoutAction.bind(this);
    this.update=this.update.bind(this);
    this.createUser=this.createUser.bind(this);
    this.createUserBioToggle=this.createUserBioToggle.bind(this);
    this.createUserInfo=this.createUserInfo.bind(this);
    this.addUser=this.addUser.bind(this);
    this.post=this.post.bind(this);
    this.addCompany = this.addCompany.bind(this);
    this.resetNewToNull=this.resetNewToNull.bind(this);
    this.forgotPassword=this.forgotPassword.bind(this);
    this.resendPassword=this.resendPassword.bind(this);
	}

  resetNewToNull() {
    this.setState({ newCompanyName: null });
  }

  post() {

    let request = new Request('https://toolbbe.herokuapp.com/api/users', {
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
    });
  }

  addCompany() {
    let request = new Request('https://toolbbe.herokuapp.com/api/companies', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        name: this.state.newCompanyName,
        street_address: '',
        city: '',
        state: '',
        country: '',
        email: '',
        phone_number: ''
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      let info = this.state.userInfo;
      info.companyId = data._id;
      info.companyName = data.name;

      auth.createUserWithEmailAndPassword(info.email, info.password)
          .then( response => {
            var user = auth.currentUser;
            user.updateProfile({
              displayName: info.displayName
            }).then( response => {
              user.sendEmailVerification().then( () => {
                // post user data;
                this.post();
                this.setState({ finished: true });
              }).catch( error => {
                this.setState({ failed: 'invalid email'});
              });
            }).catch( error => {
              this.setState({ failed: error.code });
            });
          }).catch( error => {
            this.setState({ failed: error.code });
          });
    });
  }

  forgotPassword() {
    this.setState({ resetPassword: !this.state.resetPassword });
  }

  createUserInfo(e) {
    let info = this.state.userInfo;
    switch(e.target.name) {
      case 'name' :
        info.displayName = e.target.value;
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
      case 'newCompanyName' :
        this.setState({ newCompanyName: e.target.value });
        break;
      default :
        return;
    }
  }

  createUser() {
    this.setState({ createUser: !this.state.createUser, failed: false });
  }

  createUserBioToggle() {
    this.setState({ createUserBio: !this.state.createUserBio, failed: false });
  }

  componentWillMount() {
    fluxActions.setUrl();

    if(sessionStorage.getItem('userId')) {
      this.setState({ validEmail: true });
      fluxActions.setUserInfo();
    }
  }

  login() {
    if(this.state.validEmail) {
      return <HomePage
              logout={this.logoutAction}
              title={this.state.title} />
    } else {
      if(this.state.createUser) {
        return <CreateUser
                addUser={this.addUser}
                createUser={this.createUser}
                createUserInfo={this.createUserInfo}
                finished={this.state.finished}
                resetNewToNull={this.resetNewToNull}
                failed={this.state.failed}
                title={this.state.title} />
      } else if (this.state.createUserBio) {
        return <CreateUserBio 
                createUser={this.createUser}
                createUserBioToggle={this.createUserBioToggle}
                title={this.state.title} />
      } else if (this.state.resetPassword) {
        return <ResetPassword 
                forgotPassword={this.forgotPassword}
                resendPassword={this.resendPassword}
                update={this.update}
                title={this.state.title}/>
      } else {
        return <Login
                forgotPassword={this.forgotPassword}
                login={this.loginAction}
                update={this.update}
                createUserBioToggle={this.createUserBioToggle}
                createUser={this.createUser}
                failed={this.state.failed}
                title={this.state.title} />
      }
    } 
  }

  update(e) {
    let object = {};
    object[e.target.name] = e.target.value;
    this.setState( object );
  }

  loginAction() {
    this.setState({ failed: null });
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then( result => {
        fetch('https://toolbbe.herokuapp.com/api/allusers')
          .then( response => { return response.json(); }).then( data => {

            if(data.length > 0) {

              let userData = data.filter( item => { return item.email.toLowerCase() === result.email.toLowerCase() })[0];

              fluxActions.setUserInfo(userData);
              sessionStorage.setItem('userId', userData._id);

              this.setState({ validEmail: result.email, password: null });

            } else {

              this.setState({ failed: 'login database error' });

            }
          });
      }).catch( error => {

        this.setState({failed: error.code});

      })
  }

  resendPassword() {
    auth.sendPasswordResetEmail(this.state.email)
      .then( () => {})
      .catch( error => {
        console.log(error);
      });
    this.forgotPassword();
  }

  addUser() {

    this.setState({ failed: null });
    let info = this.state.userInfo;
    if(!info.displayName || (!info.companyId && !this.state.newCompanyName) || !info.email ||  !info.password ) {
      this.setState({ failed: 'required fields must be filled in' });
    } else {
      if(this.state.newCompanyName) {
        this.addCompany();
      } else {
        auth.createUserWithEmailAndPassword(info.email, info.password)
          .then( response => {
            var user = auth.currentUser;
            user.updateProfile({
              displayName: info.displayName
            }).then( response => {
              user.sendEmailVerification().then( () => {
                // post user data;
                this.post();
                this.setState({ finished: true });
              }).catch( error => {
                this.setState({ failed: 'invalid email'});
              });
            }).catch( error => {
              this.setState({ failed: error.code });
            });
          }).catch( error => {
            this.setState({ failed: error.code });
          });
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
      <div className="App" id="App">
        {login}
      </div>
    );
  }
}

export default App;
