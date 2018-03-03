import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';
import searchableFields from '../AppInformation/SearchableFields';
import UsersEditor from './UsersEditor';

class Users extends Component {
	constructor() {
		super()
		this.state = {
			users: [],
			companies: [],
			toolId: '',
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
	  	let id = sessionStorage.getItem('user').split(',')[1],
	  		urlTemp = sessionStorage.getItem('user').split(',')[2],
			url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
			request = new Request(url + '/users?company_id=' + id, {
	      method: 'GET',
	      headers: new Headers({ 'Content-Type': 'application/json' })
	    });

	    fetch(request).then( response => {
	    	return response.json();
	    }).then( data => {
	      this.setState({ users: data, loaded: true });
	    });
	}

	toggleModal(toolId) {
	    this.setState({ toolId: toolId, editing: !this.state.editing });
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
        	searchable={searchableFields.users}
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
