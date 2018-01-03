import React, { Component } from 'react';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';

class Companies extends Component {
	constructor() {
		super()
		this.state = {
			companies: []
		}
		this.get=this.get.bind(this);
	}

	get() {
	  	let urlTemp = sessionStorage.getItem('user').split(',')[2],
			url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
			request = new Request(url + '/companies', {
	      method: 'GET',
	      headers: new Headers({ 'Content-Type': 'application/json' })
	    });

	    fetch(request).then( response => {
	    	return response.json();
	    }).then( data => {
	    	console.log('all companies loaded');
	      this.setState({ companies: data });
	    });
	}

	componentWillMount() {
		this.get();
	}

  render() {
    return (
      <div className='companies'>
      	<h3>Companies</h3>
      	<Table 
      		data={this.state.companies}
      		headers={headers.Companies}
      		link={'/company/'} />
      </div>
    );
  }
}

export default Companies;
