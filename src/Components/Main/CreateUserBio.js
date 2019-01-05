import React, { Component } from 'react';

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
            <span className='big-title'>{this.props.title}</span>
            <div className='title-box bio-box'>
              <h1>{this.props.title}</h1>
              <div className='login-description'>A purchasing tool for machine shops</div>
              <p className="toolbox-bio">
                Taking a new approach to shop management, ToolBox creates an environment that lets you run your business easily and effectiently. 
                Now you can get access to all of your data anywhere you have an internet connection. <br /><br />
                With an online interface, whether you're out running errands, or in front of your computer, you can quickly see the state of the inventory in your shop. 
                Ordering machines, tools, material, and anything else you need can be done with one button, and you can track the progress of your inventory as it goes from a vendor through your shop's jobs. <br /><br />
                Click Get Started to create a free account for your company
              </p>
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
