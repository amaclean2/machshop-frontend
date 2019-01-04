import React, { Component } from 'react';
import Progress from './Progress';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: false
    }
    this.login=this.login.bind(this);
  }

  login() {
    this.props.login();

    setTimeout(() => {

      if(!this.props.failed) {
        this.setState({ progress: true });
      }

    }, 100);
  }

  render() {
    return (
      <div className='login-screen'>
        <div className="modal-container login-container">
          <div className='modal-content login-modal'>
            <span className='big-title'>{this.props.title}</span>
            <div className='title-box'>
              <h1>{this.props.title}</h1>
              <div className='login-description'>A purchasing tool for machine shops</div>
            </div>
            <div className='login'>
              <div className='login-title'>Login to your account</div>
              <div className='interactions'>
                <span className={'error-message fade-in ' + (this.props.failed ? '' : 'gone')}>
                  Your email or password wasn't recognized
                </span>
                <input
                  type='email'
                  onChange={this.props.update}
                  className={'create-name ' + (this.props.failed ? 'bad-input' : '')}
                  name='email' placeholder='email' />
                <input type='password'
                  onChange={this.props.update}
                  className={'create-name ' + (this.props.failed ? 'bad-input' : '')}
                  name='password'
                  placeholder='password' />
                <div className="finish-buttons">
                  <button className='button login-button' onClick={this.login}>Login</button>
                  <button className='button white-button' onClick={this.props.forgotPassword} >Forgot password</button>
                  <Progress activated={this.state.progress}/>
                </div>
              </div>
            </div>
            <div className='register'>
              <div className="register-desc">
                <button className='button toggle-bio' onClick={this.props.createUserBioToggle} >Find out about ToolBox</button>
                <button className='button login-button white-button' onClick={this.props.createUser} >Create an Account</button>
              </div>
              {/*<a href="#" className="read-more-action">Read More</a>*/}
              {/*<div className='login-title'>Register for a new account</div>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
