import React, { Component } from 'react';

class Login extends Component {

  render() {
    return (
      <div className="login-page modal-container">
        <div className='modal-content login-modal'>
          <div className='login'>
            <span className='login-title'>Login to MachShop</span>
            <div className='interactions'>
              <button className='button login-button' onClick={this.props.login} >Login</button>
            </div>
          </div>
          <div className='register'>
            <span className='login-title'>Register for a new account</span>
            <button className='button register-button'>Get started</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
