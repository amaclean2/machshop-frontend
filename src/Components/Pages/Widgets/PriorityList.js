import React, { Component } from 'react';
import MiniTable from '../../Main/MiniTable';
import headers from '../../AppInformation/TableHeaders';

class PriorityList extends Component {
	constructor() {
		super()
		this.state = {
			jobs: [],
			loaded: false
		}
		this.get=this.get.bind(this);
		this.renderTable=this.renderTable.bind(this);
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
	      this.setState({ jobs: data, loaded: true });
	    });
	}

	componentWillMount() {
		this.get();
	}

	renderTable() {
		if(this.state.loaded) {
			return (<MiniTable 
       	data={this.state.jobs}
        headers={headers.JobsWidget}
        link={'/jobs/'} />);
		} else {
			return null;
		}
	}

  render() {
  	let table = this.renderTable();
    return (
    	<div className="widget card priority">
        	<span className="widget-header">Priority Jobs</span>
        	{table}
      </div>
    );
  }
}

export default PriorityList;