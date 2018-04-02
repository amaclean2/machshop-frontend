import React, { Component } from 'react';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';
import searchableFields from '../AppInformation/SearchableFields';
import CompanyEditor from './CompanyEditor';

class Companies extends Component {
	constructor() {
		super()
		this.state = {
			companies: [],
			editing: false,
			loaded: false,
			companyId: sessionStorage.getItem('user').split(',')[1]
		}

		this.copyButton=this.copyButton.bind(this);
		this.get=this.get.bind(this);
		this.toggleModal=this.toggleModal.bind(this);
	}

	copyButton(e) {
		let input = e.target.children[0];
		input.select();

		document.execCommand('Copy');
		console.log(input.value);
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

	toggleModal(companyId) {
		this.setState({ toolId: companyId, editing: !this.state.editing });
	}

	generateEditorModal() {
		if(this.state.editing) {
			return <CompanyEditor
							id={this.state.toolId}
							machine={this.state.tools}
							toggleModal={this.toggleModal}
							triggerUpdate={this.get} />
		} else {
			return '';
		}
	}

	drawTable() {
		if(this.state.loaded) {
			return <Table
				data={this.state.companies}
				headers={headers.Companies}
				searchable={searchableFields.company}
				noAdd={true}
				toggleModal={this.toggleModal} />;
		} else {
			return <span className='loading-screen'>It's a lot of work to assemble a table</span>;
		}
	}

	componentWillMount() {
		this.get();
	}


  render() {
  	let companyEditorModal = this.generateEditorModal(),
  			table = this.drawTable();
    return (<div className='companies'>
    		{companyEditorModal}
        <h3>MyCompany</h3>
        {table}
      </div>);
  }
}

export default Companies;