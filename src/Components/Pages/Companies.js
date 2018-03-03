import React, { Component } from 'react';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';
import searchableFields from '../AppInformation/SearchableFields';

class Companies extends Component {
	constructor() {
		super()
		this.state = {
			companies: [],
			loaded: false
		}
		this.get=this.get.bind(this);
	}

	get() {
	  let urlTemp = sessionStorage.getItem('user').split(',')[2],
	  		companyId = sessionStorage.getItem('user').split(',')[1];

	  companyId = companyId === '5a4b0203734d1d7cf82ec0b8' ? '' : '/' + companyId;

		let url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
				request = new Request(url + '/companies' + companyId, {
	      	method: 'GET',
	      	headers: new Headers({ 'Content-Type': 'application/json' })
	    	});

	  fetch(request).then( response => {
	    return response.json();
	  }).then( data => {
	  	let newData;
	  	if(Array.isArray(data)) {
	  		newData = data;
	  	} else {
	  		newData = []
	    	newData.push(data);
	  	}
	    this.setState({ companies: newData, loaded: true });
	  });
	}

	loadTable() {
		if(this.state.loaded) {
			return <Table 
	      		data={this.state.companies}
	      		headers={headers.Companies}
	      		searchable={searchableFields.company}
	      		link={'/company/'} />;
		} else {
			return <span className='loading-screen'>It takes a while to build an empire</span>
		}
	}

	componentDidMount() {
		this.get();
	}

  render() {
  	let table = this.loadTable();
    return (
      <div className='companies'>
      	<h3>My Company</h3>
      	{table}
      </div>
    );
  }
}

export default Companies;
