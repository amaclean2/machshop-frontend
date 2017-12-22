import React, { Component } from 'react';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';

class Users extends Component {
	constructor() {
		super()
		this.state = {
			users: [],
		}
		this.get=this.get.bind(this);
	}

	get() {
	  	let request = new Request(this.props.url + '/users', {
	      method: 'GET',
	      headers: new Headers({ 'Content-Type': 'application/json' })
	    });

	    fetch(request).then( response => {
	    	return response.json();
	    }).then( data => {
	    	console.log('user list loaded');
	      this.setState({ users: data });
	    });
	}

	componentWillMount() {
		console.log(sessionStorage.getItem('user').split(','));
		this.get();
	}

  render() {
  	let companyId = sessionStorage.getItem('user').split(',')[1];
    return (
    	<div>
        <h3>Users</h3>
        <div className='company-id' >Company Id: { companyId }</div>
        <Table
        	data={this.state.users}
        	headers={headers.Users}
        	noAdd={true}
        	link={'/users/'} />
      </div>
    );
  }
}

export default Users;
