import React, { Component } from 'react';
import Progress from './Progress';

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      companyList: [],
      company: 'new company',
      progress: false,
      newCompany: false
    }
    this.get=this.get.bind(this);
    this.getCompany=this.getCompany.bind(this);
    this.addUser=this.addUser.bind(this);
    this.toggleNewCompany=this.toggleNewCompany.bind(this);
  }

  toggleNewCompany() {
    this.setState({ newCompany: !this.state.newCompany }, () => {
      if(!this.state.newCompany) {
        this.props.resetNewToNull();
      }
    });
  }

  addUser() {
    this.props.addUser();

    setTimeout(() => {

      if(!this.props.failed) {
        this.setState({ progress: true });
      }

    }, 100);
    
  }

  get() {
    fetch('https://toolbbe.herokuapp.com/api/companies').then( response => {
      return response.json();
    }).then( data => {
      this.setState({ companyList: data });
    })
  }

  componentDidMount() {
    this.get();
  }

  getCompany(e) {
    if(e.target.value.toLowerCase() === 'test') {
      e.target.value = '5a43011d6ceec000140f63dd';
    }
    this.state.companyList.forEach( company => {
      if(e.target.value === company._id) {
        this.setState({company: company.name});
        this.props.createUserInfo(e);
      }
    })
  }

  finished() {
    if(this.props.finished) {
      return <div>
              <div className='final-message fade-in'>View your email for final steps to confirm your account. Thanks for joining</div>
              <button className='button fade-in' onClick={this.props.createUser} >back to Login</button>
            </div>
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
            name='name' placeholder="first and last name" />
          <span className={'create-name'}>
            <input
              type='checkbox'
              id='newCompany'
              onChange={this.toggleNewCompany}
              onBlur={this.toggleNewCompany}
              name='newCompany' />
            <label htmlFor={'newCompany'}>New Company</label>
          </span>
          <input
            type='text'
            className={'create-name ' + (this.state.newCompany ? '' : 'gone')}
            name='newCompanyName'
            onChange={this.props.createUserInfo}
            placeholder={'company name'} />
          <input
            type='text'
            onChange={this.getCompany}
            className={'create-name required ' + (this.props.failed ? 'bad-input ' : '') + (this.state.newCompany ? 'gone ' : '')}
            name='cid' placeholder='company id' />
          <div className="company-instructions">To get the company id, someone that already is associated with the company needs to login to their accound, go to the companies page, and copy the company id. Then you can enter it when you create a new user.</div>
          <div className={'create-name ' + (this.state.newCompany ? 'gone ' : '')} >{ this.state.company }</div>
          <input
            type='email'
            onChange={this.props.createUserInfo}
            className={'create-name required ' + (this.props.failed ? 'bad-input' : '')}
            name='email' placeholder='email' />
          <input type='password'
            onChange={this.props.createUserInfo}
            className={'create-name required ' + (this.props.failed ? 'bad-input' : '')}
            name='pass'
            placeholder='password' />
            <div className="finish-buttons">
              <button className='button create-button' onClick={this.addUser} >
                Create user
              </button>
              <button className='button white-button' onClick={this.props.createUser} >
                back to Login
              </button>
              <Progress activated={this.state.progress} />
            </div>
        </div>
      )
    }
  }

  render() {
    let finished = this.finished();
    return (
      <div className="login-screen" id="Main/CreateUser">
        <div className="modal-container login-container">
          <div className='modal-content login-modal'>
            <div className='title-box'>
              <h1>{this.props.title}</h1>
              <div className='login-description'>A purchasing tool for machine shops</div>
            </div>
            <div className='create-user'>
              <span className='login-title'>Set up a new account</span>
              {finished}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
