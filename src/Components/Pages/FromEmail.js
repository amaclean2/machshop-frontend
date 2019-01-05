import React, { Component } from 'react';

import * as fluxActions from '../../Flux/actions';

class FromEmail extends Component {
	constructor() {
		super()
		this.state = {
			password: '',
			password2: '',
			error: false,
			passShow: false
		}
		this.testPassword=this.testPassword.bind(this);
		this.enterPassword=this.enterPassword.bind(this);
		this.changePassview=this.changePassview.bind(this);
	}

	testPassword() {
		let validPass = this.state.password === this.state.password2;
		validPass = validPass && this.state.password.length > 6;

		if(validPass) {
			this.props.passReset(this.state.password);

		} else {
			this.setState({ error: true });
		}
	}

	changePassview() {
		this.setState({ passShow: !this.state.passShow });
	}

	returnToHome() {
		window.location.href = "http://toolboxproject.io";
	}

	enterPassword(e) {
		let obj = {};
		obj[e.target.name] = e.target.value;

		if(this.state.error) {
			this.setState({ error: false });
		}

		this.setState(obj);
	}

	componentWillMount() {
		fluxActions.setPasswordReset();
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
	            	<div className='create-user'>
	            		<div className='interactions'>
	            			<div className='login-title'>Enter your new password</div>
	            			<br />
	            			<span className={'error-message fade-in ' + (this.state.error ? '' : 'gone')}>Your password must be at least 7 characters and match both times</span>
	            			<input type={this.state.passShow ? 'text' : 'password'} onChange={this.enterPassword} className='create-name' name='password' placeholder='new password' autoFocus />
	            			<input type={this.state.passShow ? 'text' : 'password'} onChange={this.enterPassword} className='create-name' name='password2' placeholder='re-enter your password' />
	            			<div>
	            				<input type='checkbox' onChange={this.changePassview} id='passCheck' />
	            				<label htmlFor='passCheck' >Show password</label>
	            			</div>
	            			<div className="finish-buttons">
			                  <button className='button login-button' onClick={this.testPassword} >Reset Password</button>
			                  <button className='button white-button' onClick={this.returnToHome}>Cancel</button>
			                </div>
	            		</div>
	            	</div>
	        	</div>
	    	</div>
	    </div>);
	}
}

export default FromEmail;
