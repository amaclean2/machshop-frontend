import React, { Component } from 'react';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';
import searchableFields from '../AppInformation/SearchableFields';

class Users extends Component {
	constructor() {
		super()
		this.state = {
			users: [],
			companies: []
		}
		this.get=this.get.bind(this);
	}

	get() {
	  	let id = sessionStorage.getItem('user').split(',')[1],
	  		urlTemp = sessionStorage.getItem('user').split(',')[2],
			url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
			request = new Request(url + '/users?company_id=' + id, {
	      method: 'GET',
	      headers: new Headers({ 'Content-Type': 'application/json' })
	    });

	    fetch(request).then( response => {
	    	return response.json();
	    }).then( data => {
	      this.setState({ users: data });
	    });
	}

	componentWillMount() {
		this.get();
	}

  render() {
  	let companyId = sessionStorage.getItem('user').split(',')[1];
    return (
    	<div>
        <h3>Users</h3>
        <div className='company-id' >
        	<span className='label'>Company Id: </span>
        	{ companyId }
        	<button className='button small-button'>Copy id</button>
        </div>
        <Table
        	data={this.state.users}
        	headers={headers.Users}
        	searchable={searchableFields.users}
        	noAdd={true}
        	link={'/users/'} />
      </div>
    );
  }
}

export default Users;
