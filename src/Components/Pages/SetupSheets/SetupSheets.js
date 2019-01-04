import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';
import SetupEditorModal from './SetupEditorModal';
import fluxStore from '../../../Flux/fluxStore';
import LoadingBlock from '../../Main/LoadingBlock';

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

	toggleModal(setupId) {
		this.setState({ edit: !this.state.edit, setupId: setupId });
	}

	componentWillMount() {
	    if(fluxStore.getReady('t'))
	    	this.setState({ loaded: true });

	    fluxStore.on('allUpdated', () => {
	    	this.setState({ loaded: true });
	    });
	}

	showTable() {
		if (this.state.loaded) {
			return (<Table
          		addText={'add a new setup sheet'}
          		data={fluxStore.getSetupSheets()}
          		headers={headers.SetupSheets}
          		toggleModal={this.toggleModal} />);
		} else {
			return (<LoadingBlock loadingMessage="loading setup sheets" />);
		}
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
  		let table = this.showTable();

    	return (<div id="Pages/SetupSheets/SetupSheets" className="setup">
    			{setupEditorModal}
	        	<h3>Setup Sheets</h3>
        		{table}
      		</div>);
  		}
	}

export default SetupSheets;
