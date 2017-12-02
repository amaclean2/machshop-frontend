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
import Admin from '../Pages/Admin';

class HomePage extends Component {
	constructor() {
		super()
		this.state = {
			tabs: [ 'Dashboard',
  			'Parts',
  			'Jobs',
  			'Machining',
  			'Ordering',
  			'Inspection',
  			'Users',
  			'Admin' ]
		}
	}

	primaryContent() {
		return ( <div> 
			<Header tabs={this.state.tabs} />
			<div className="page-content">
				<Route path='/dashboard' render={(props) => ( <Dashboard /> )} />
				<Route path='/parts' render={(props) => ( <Parts /> )} />
				<Route path='/jobs' render={(props) => ( <Jobs /> )} />
				<Route path='/machining' render={(props) => ( <Machining /> )} />
				<Route path='/ordering' render={(props) => ( <Ordering /> )} />
				<Route path='/inspection' render={(props) => ( <Inspection /> )} />
				<Route path='/users' render={(props) => ( <Users /> )} />
				<Route path='/admin' render={(props) => ( <Admin /> )} />
			</div>
		</div> )
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
