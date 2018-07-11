import React, { Component } from 'react';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';
import CompanyEditor from './CompanyEditor';

import fluxStore from '../../Flux/fluxStore';

class Companies extends Component {
	constructor() {
		super()
		this.state = {
			companies: [],
			editing: false,
			loaded: false,
			companyId: ''
		}
		
		this.toggleModal=this.toggleModal.bind(this);
	}

	toggleModal(companyId) {

    	if(companyId) {
    		this.setState({ toolId: companyId, editing: !this.state.editing });
    	} else {
    		this.setState({ editing: !this.state.editing });
    	}
	}

	generateEditorModal() {
		if(this.state.editing) {
			return <CompanyEditor
					id={this.state.toolId}
					toggleModal={this.toggleModal} />
		} else {
			return '';
		}
	}

	drawTable() {
		if(this.state.loaded) {
			return <Table
				data={this.state.companies}
				headers={headers.Companies}
				noAdd={true}
				noSearch={true}
				toggleModal={this.toggleModal} />;
		} else {
			return <span className='loading-screen'>It's a lot of work to assemble a table</span>;
		}
	}

	componentWillMount() {
	    if(fluxStore.getReady())
	    	this.setState({ companies: fluxStore.getCompanies(), loaded: true, companyId: fluxStore.getCompanyId()});

	    fluxStore.on('updatedCompanies', () => {
	    	this.setState({ loaded: false });
	    	this.setState({ companies: fluxStore.getCompanies(), loaded: true, companyId: fluxStore.getCompanyId()});
	    });
	}


  render() {
  	let companyEditorModal = this.generateEditorModal(),
  		table = this.drawTable();
    return (
    	<div className='companies' id='Pages/Companies'>
    		{companyEditorModal}
        	<h3>My Company</h3>
        	{table}
      	</div>);
  }
}

export default Companies;