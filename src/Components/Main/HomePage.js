import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Dashboard from '../Pages/Dashboard';
import Parts from '../Pages/Parts';
import Jobs from '../Pages/Jobs';
import Machining from '../Pages/Machining';
import Ordering from '../Pages/Ordering';
import Inspection from '../Pages/Inspection';
import Users from '../Pages/Users';
import PartsEditor from '../Pages/PartsEditor';
import JobsEditor from '../Pages/JobsEditor';
import UsersEditor from '../Pages/UsersEditor';
import Companies from '../Pages/Companies';
import CompanyEditor from '../Pages/CompanyEditor';
import ToolEditor from '../Pages/Tools/ToolEditor';
// import LatheToolEditor from '../Pages/Tools/LatheToolEditor';
// import OtherToolEditor from '../Pages/Tools/OtherToolEditor';

class HomePage extends Component {
	constructor() {
		super()
		this.state = {
			tabs: ['Dashboard', 'Parts', 'Jobs', 'Machining', 'Ordering', 'Inspection', 'Users', 'Companies']
		}
	}

	primaryContent() {
		return (
			<div> 
				<Header tabs={this.state.tabs} logout={this.props.logout} />
				<div className="page-content">
					<Route exact path='/' component={Dashboard} />
					<Route path='/dashboard' component={Dashboard} />
					<Route path='/parts/:partId' component={PartsEditor} />
					<Route exact path='/parts'component={Parts} />
					<Route path='/jobs/:jobId' component={JobsEditor} />
					<Route exact path='/jobs' component={Jobs} />
					<Route path='/machining' component={Machining} />
					<Route path='/tool/mill/:toolId' component={ToolEditor} />
					<Route path='/tool/lathe/:toolId' component={ToolEditor} />
					<Route path='/tool/other/:toolId' component={ToolEditor} />
					<Route path='/ordering' component={Ordering} />
					<Route path='/inspection' component={Inspection} />
					<Route path='/users/:userId' component={UsersEditor} />
					<Route path='/company/:companyId' component={CompanyEditor} />
					<Route exact path='/companies' component={Companies} />
					<Route exact path='/users' component={Users} />
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
