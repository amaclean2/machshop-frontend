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
	  	let request = new Request(this.props.url + '/jobs', {
	      method: 'GET',
	      headers: new Headers({ 'Content-Type': 'application/json' })
	    });

	    fetch(request).then( response => {
	    	return response.json();
	    }).then( data => {
	    	console.log('all jobs loaded');
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
