import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';
// import JobEditorModal from './JobsEditorModal';
import fluxStore from '../../../Flux/fluxStore';
import LoadingBlock from '../../Main/LoadingBlock';

class Jobs extends Component {
	constructor() {
		super()
		this.state = {
			data: [],
			edit: false,
			jobId: '0'
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
			console.log(headers.Jobs);
			return (<Table
          		addText={'add a new job'}
          		data={fluxStore.getJobs()}
          		headers={headers.Jobs}
          		toggleModal={this.toggleModal} />);
		} else {
			return (<LoadingBlock loadingMessage="loading jobs" />);
		}
	}

	showModal() {
		if(this.state.edit) {
			// return <SetupEditorModal
   //            id={this.state.setupId}
   //            toggleModal={this.toggleModal} />;

   			return '123';
		} else {
			return '';
		}
	}

  	render() {
  		let jobEditorModal = this.showModal();
  		let table = this.showTable();

    	return (<div id="Pages/Jobs/Jobs" className="jobs">
    			{jobEditorModal}
	        	<h3>Jobs</h3>
        		{table}
      		</div>);
  		}
	}

export default Jobs;

