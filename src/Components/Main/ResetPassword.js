import React, { Component } from 'react';

class ResetPassword extends Component {

  render() {
    return (<div className='login-screen'>
        <div className="modal-container login-container">
          <div className='modal-content login-modal'>
            <div className='title-box'>
              <h1>{this.props.title}</h1>
              <div className='login-description'>A purchasing tool for machine shops</div>
            </div>
            <div className='create-user'>
              <div className='login-title'>Enter an email to reset password</div>
              <div className='interactions'>
                <input
                  type='email'
                  onChange={this.props.update}
                  className={'create-name ' + (this.props.failed ? 'bad-input' : '')}
                  name='email' placeholder='email' />
                <div className="finish-buttons">
                  <button className='button login-button' onClick={this.props.resendPassword}>Send Password</button>
                  <button className='button white-button' onClick={this.props.forgotPassword}>back to Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default ResetPassword;
