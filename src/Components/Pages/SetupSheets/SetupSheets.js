import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';
import SetupEditorModal from './SetupEditorModal';

class SetupSheets extends Component {
	constructor() {
		super()
		this.state = {
			data: [],
			edit: false,
			setupId: '0'
		}
		this.toggleModal=this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState({ edit: !this.state.edit });
	}

	showModal() {
		if(this.state.edit) {
			return <SetupEditorModal
              id={this.state.setupId}
              toggleModal={this.toggleModal} />;
		} else {
			return '';
		}
	}

  	render() {
  		let setupEditorModal = this.showModal();
    	return (<div id="Pages/SetupSheets/SetupSheets" className="setup">
    			{setupEditorModal}
	        	<h3>Setup Sheets</h3>
	        	<Table
	          		addText={'add a new setup sheet'}
	          		data={this.state.data}
	          		headers={headers.SetupSheets}
	          		toggleModal={this.toggleModal} />


      		</div>);
  		}
	}

export default SetupSheets;
