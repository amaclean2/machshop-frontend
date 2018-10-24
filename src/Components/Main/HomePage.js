import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
//import Dashboard from '../Pages/Dashboard';
//import Parts from '../Pages/Parts';
//import Jobs from '../Pages/Jobs';
// import Machining from '../Pages/Machining';
//import Tools from '../Pages/Tools/Tools';
import Ordering from '../Pages/Ordering/Ordering';
//import Inspection from '../Pages/Inspection';
import Users from '../Pages/Users';
//import PartsEditor from '../Pages/PartsEditor';
//import JobsEditor from '../Pages/JobsEditor';
import Companies from '../Pages/Companies';
//import CompanyEditor from '../Pages/CompanyEditor';
// import ResetPassword from '../Pages/ResetPassword';
// import LatheToolEditor from '../Pages/Tools/LatheToolEditor';
// import OtherToolEditor from '../Pages/Tools/OtherToolEditor';

class HomePage extends Component {
	constructor() {
		super()
		this.state = {
			tabs: [
				// 'Dashboard', 
				// 'Parts', 
				// 'Jobs',
				// { name: 'Tools', value: 'machining'}, 
				{ name: 'Tooling', value: 'ordering'}, 
				// 'Inspection',
				{name: 'Users', value: 'users'}, 
				{name: 'My Company', value: 'companies'}
			]
		}
	}

	primaryContent() {
		return (
			<div id="HomePage"> 
				<Header tabs={this.state.tabs} logout={this.props.logout} title={this.props.title} />
				<div className="page-content">
					<Route exact path='/' component={Ordering} />
					<Route path='/ordering' component={Ordering} />
					<Route path='/?mode=resetPassword' component={Companies} />
					<Route exact path='/companies' component={Companies} />
					<Route exact path='/users' component={Users} />
					<Route path='/?mode=resetPassword' component={Users} />
				</div>
			</div> );
	}

  render() {
  	let content = this.primaryContent();
    return (
	      <BrowserRouter>
	      	{content}
	      </BrowserRouter>
    );
  }
}

export default HomePage;
