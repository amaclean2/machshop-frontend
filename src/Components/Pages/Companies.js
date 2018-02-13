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
	    this.setState({ companies: newData });
	  });
	}

	componentDidMount() {
		this.get();
	}

  render() {
    return (
      <div className='companies'>
      	<h3>My Company</h3>
      	<Table 
      		data={this.state.companies}
      		headers={headers.Companies}
      		link={'/company/'} />
      </div>
    );
  }
}

export default Companies;
