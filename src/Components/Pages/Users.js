import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';
import UsersEditor from './UsersEditor';

import fluxStore from '../../Flux/fluxStore';

class Users extends Component {
	constructor() {
		super()

		this.state = {
			users: [],
			companies: [],
			editing: false,
			loaded: false,
			companyId: ''
		}

		this.copyButton=this.copyButton.bind(this);
		this.toggleModal=this.toggleModal.bind(this);
	}

	copyButton(e) {
		let input = e.target.children[0];
		input.select();

		document.execCommand('Copy');
		console.log(input.value);
	}

	toggleModal(userId) {
	    this.setState({ toolId: userId, editing: !this.state.editing });
	}

	generateEditorModal() {
	    if(this.state.editing) {
	        return <UsersEditor
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
        	data={this.state.users}
        	headers={headers.Users}
        	noAdd={true}
        	toggleModal={this.toggleModal} />;
  		} else {
  			return <span className='loading-screen'>It's a lot of work to assemble a table</span>;
  		}
  	}

	componentWillMount() {
	    if(fluxStore.getReady())
	    	this.setState({ users: fluxStore.getUsers(), loaded: true, companyId: fluxStore.getCompanyId()});

	    fluxStore.on('change', () => {
	    	this.setState({ users: fluxStore.getUsers(), loaded: true, companyId: fluxStore.getCompanyId()});
	    });
	}


  render() {
  	let userEditorModal = this.generateEditorModal();
  	let table = this.drawTable();
    return (
    	<div>
    		{userEditorModal}
        <h3>Users</h3>
        <div className='company-id' >
        	<span className='label'>Company Id: </span>
        	<span>{ this.state.companyId }</span>
        	<CopyToClipboard text={this.state.companyId}>
	          <span className='button small-button'>Copy id</span>
	        </CopyToClipboard>
        </div>
        {table}
      </div>
    );
  }
}

export default Users;
