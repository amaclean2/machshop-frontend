import React, { Component } from 'react';

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      companyList: [],
      company: 'New Company'
    }
    this.get=this.get.bind(this);
    this.getCompany=this.getCompany.bind(this);
  }

  get() {
    fetch('https://machapi.herokuapp.com/api/companies').then( response => {
      return response.json();
    }).then( data => {
      console.log(data);
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
            name='name' placeholder='full name' />
          <input
            type='text'
            onChange={this.getCompany}
            className={'create-name required ' + (this.props.failed ? 'bad-input' : '')}
            name='cid' placeholder='company id' />
          <div className={'create-name'} >{ this.state.company }</div>
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
