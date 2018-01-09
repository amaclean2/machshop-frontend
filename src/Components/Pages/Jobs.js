import React, { Component } from 'react';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';

class Jobs extends Component {
	constructor() {
		super()
		this.state = {
			jobs: [],
		}
		this.get=this.get.bind(this);
	}

	get() {
	  	let url = sessionStorage.getItem('user').split(',')[2],
	  		id = sessionStorage.getItem('user').split(',')[1],
	  		request = new Request(url + '/jobs?company_id=' + id, {
	      method: 'GET',
	      headers: new Headers({ 'Content-Type': 'application/json' })
	    });

	    fetch(request).then( response => {
	    	return response.json();
	    }).then( data => {
	      this.setState({ jobs: data });
	    });
	}

	componentWillMount() {
		this.get();
	}

  render() {
    return (
    	<div>
        <h3>Jobs</h3>
        <Table
        	data={this.state.jobs}
        	headers={headers.Jobs}
        	link={'/jobs/'} />
      </div>
    );
  }
}

export default Jobs;
