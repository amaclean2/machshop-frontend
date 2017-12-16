import React, { Component } from 'react';
import MiniTable from '../../Main/MiniTable';
import headers from '../../AppInformation/TableHeaders';

class PriorityList extends Component {
	constructor() {
		super()
		this.state = {
			jobs: []
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
	      this.setState({ jobs: data });
	    });
	}

	componentWillMount() {
		this.get();
	}

  render() {
    return (
    	<div className="widget">
        	<span className="widget-header">Priority Jobs</span>
        	<MiniTable 
        		data={this.state.jobs}
        		headers={headers.JobsWidget}
        		url={this.props.url}
        		link={'/jobs/'} />
      </div>
    );
  }
}

export default PriorityList;