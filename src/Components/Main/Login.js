import React, { Component } from 'react';

class Login extends Component {

  render() {
    return (
      <div className='login-screen'>
        <div className="modal-container">
          <div className='modal-content login-modal'>
            <h1>MachShop</h1>
            <div className='login'>
              <div className='login-title'>Login to your account</div>
              <div className='interactions'>
                <span className={'error-message fade-in ' + (this.props.failed ? '' : 'gone')}>
                  Your email or password wasn't recognized
                </span>
                <input
                  type='text'
                  onChange={this.props.update}
                  className={'create-name ' + (this.props.failed ? 'bad-input' : '')}
                  name='email' placeholder='email' />
                <input type='password'
                  onChange={this.props.update}
                  className={'create-name ' + (this.props.failed ? 'bad-input' : '')}
                  name='password'
                  placeholder='password' />
                <button className='button login-button' onClick={this.props.login} >
                  Login
                </button>
                <button className='button white-button' >Forgot password</button>
              </div>
            </div>
            <div className='register'>
              <div className='login-title'>Register for a new account</div>
              <button className='button login-button save-button' onClick={this.props.createUser} >Get started</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
