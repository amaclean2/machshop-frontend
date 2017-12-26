import React, { Component } from 'react';

import MiniTable from '../../Main/MiniTable';
import headers from '../../AppInformation/TableHeaders';

class Employees extends Component {
	constructor() {
		super()
		this.state = {
			users: [],
			loaded: false
		}
		this.get=this.get.bind(this);
		this.renderTable=this.renderTable.bind(this);
	}

	get() {
	  	let url = 'https://machapi.herokuapp.com/api',
	  		request = new Request(url + '/users', {
	      method: 'GET',
	      headers: new Headers({ 'Content-Type': 'application/json' })
	    });

	    fetch(request).then( response => {
	    	return response.json();
	    }).then( data => {
	      this.setState({ users: data, loaded: true });
	      console.log('loaded');
	    });
	}

	renderTable() {
		if(this.state.loaded) {
			return (<MiniTable 
        data={this.state.users}
        headers={headers.UsersWidget}
        link={'/users/'} />);
		} else {
			return null;
		}
	}

	componentWillMount() {
		this.get();
	}

  render() {
  	let table = this.renderTable();
    return (
    	<div className="widget card">
        	<span className='widget-header'>Employees Clocked In</span>
        	{table}
      </div>
    );
  }
}

export default Employees;