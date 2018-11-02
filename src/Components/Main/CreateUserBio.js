import React, { Component } from 'react';
import Progress from './Progress';

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.createUserToggle=this.createUserToggle.bind(this);
  }

  createUserToggle() {
    this.props.createUserBioToggle();
    this.props.createUser();
  }

  render() {
    return (
      <div className="login-screen" id="Main/CreateUserBio">
        <div className="modal-container login-container">
          <div className='modal-content login-modal'>
            <div className='title-box'>
              <h1>{this.props.title}</h1>
              <div className='login-description'>A purchasing tool for machine shops</div>
              <div className='bio-button-area'>
                <button className='button login-button save-button' onClick={this.createUserToggle} >Get started</button>
                <button className='button white-button' onClick={this.props.createUserBioToggle} >Back to Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
