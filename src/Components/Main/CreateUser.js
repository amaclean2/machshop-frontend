import React, { Component } from 'react';

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      companyList: [],
      company: 'new company'
    }
    this.get=this.get.bind(this);
    this.getCompany=this.getCompany.bind(this);
  }

  get() {
    fetch('https://machapi.herokuapp.com/api/companies').then( response => {
      return response.json();
    }).then( data => {
      this.setState({ companyList: data });
    })
  }

  componentDidMount() {
    this.get();
  }

  getCompany(e) {
    this.state.companyList.map( company => {
      if(e.target.value === company._id) {
        this.setState({company: company.name});
      }
    })
    this.props.createUserInfo(e);
  }

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
            name='name' placeholder='name' />
          <input
            type='text'
            onChange={this.getCompany}
            className={'create-name required ' + (this.props.failed ? 'bad-input' : '')}
            name='cid' placeholder='company id' />
          <div className={'create-name'} >{ this.state.company }</div>
          <input
            type='text'
            onChange={this.props.createUserInfo}
            className={'create-name required ' + (this.props.failed ? 'bad-input' : '')}
            name='email' placeholder='email' />
          <input type='password'
            onChange={this.props.createUserInfo}
            className={'create-name required ' + (this.props.failed ? 'bad-input' : '')}
            name='pass'
            placeholder='password' />
            <div>
              <button className='button create-button' onClick={this.props.addUser} >
                Create user
              </button>
              <button className='button white-button' onClick={this.props.createUser} >
                back to Login
              </button>
            </div>
        </div>
      )
    }
  }

  render() {
    let finished = this.finished();
    return (
      <div className="login-screen">
        <div className="modal-container">
          <div className='modal-content login-modal'>
            <h1>MachShop</h1>
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
