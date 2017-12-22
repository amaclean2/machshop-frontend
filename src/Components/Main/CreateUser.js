import React, { Component } from 'react';

class CreateUser extends Component {

  finished() {
    if(this.props.finished) {
      return <div className='final-message fade-in'>View your email for final steps to confirm your account. Thanks for joining</div>
    } else {
      return (
        <div className='interactions'>
          <span className={'error-message fade-in ' + (this.props.failed ? '' : 'gone')}>
            {this.props.failed}
          </span>
          <input
            type='text'
            onChange={this.props.createUserInfo}
            className={'create-name required ' + (this.props.failed ? 'bad-input' : '')}
            name='name' placeholder='full name' />
          <input
            type='text'
            onChange={this.props.createUserInfo}
            className={'create-name'}
            name='cname' placeholder='company name' />
          <input
            type='text'
            onChange={this.props.createUserInfo}
            className={'create-name required ' + (this.props.failed ? 'bad-input' : '')}
            name='cid' placeholder='company id' />
          <input
            type='text'
            onChange={this.props.createUserInfo}
            className={'create-email required ' + (this.props.failed ? 'bad-input' : '')}
            name='email' placeholder='email' />
          <input
            type='text'
            onChange={this.props.createUserInfo}
            className={'create-email required ' + (this.props.failed ? 'bad-input' : '')}
            name='verifyEmail' placeholder=' verify email' />
          <input type='password'
            onChange={this.props.createUserInfo}
            className={'create-password required ' + (this.props.failed ? 'bad-input' : '')}
            name='pass'
            placeholder='password' />
          <input type='password'
            onChange={this.props.createUserInfo}
            className={'create-password required ' + (this.props.failed ? 'bad-input' : '')}
            name='verifyPass'
            placeholder='verify password' />
          <button className='button create-button' onClick={this.props.addUser} >
            Create user
          </button>
        </div>
      )
    }
  }

  render() {
    let finished = this.finished();
    return (
      <div className="modal-container">
        <div className='modal-content login-modal'>
          <div className='create-user'>
            <span className='login-title'>Set up a new account</span>
            <span className='required-legend'>required</span>
            <button className='button white-button put-away' onClick={this.props.createUser} >Login</button>
            {finished}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;