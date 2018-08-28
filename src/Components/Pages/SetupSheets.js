import React, { Component } from 'react';
import fluxStore from '../../Flux/fluxStore';
import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';

class SetupSheets extends Component {

	constructor() {
		super()
		this.state = {
			editable: false,
			loaded: false,
			id: ''
		}

		this.createTable=this.createTable.bind(this);
		this.toggleModal=this.toggleModal.bind(this);

	}

	createTable() {
		this.state.loaded = true;
		if(this.state.loaded) {
			return <Table 
				data = {[]}
				headers = {headers.SetupSheets}
				toggleModal = {this.toggleModal} />
		}
	}

	toggleModal(id) {
		this.setState({ id, editable: !this.state.editable });
	}

  render() {
  	let table = this.createTable();

    return (
    	<div id='Pages/SetupSheets'>
        <h3>Setup Sheets</h3>
        {table}
      </div>
    );
  }
}

export default SetupSheets;
