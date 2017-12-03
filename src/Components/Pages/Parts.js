import React, { Component } from 'react';

import Table from '../Main/Table';
import headers from '../AppInformation/TableHeaders';

class Parts extends Component {
	constructor() {
		super()
		this.state = {
			parts: [],
		}
		this.get=this.get.bind(this);
		this.post=this.post.bind(this);
		this.delete=this.delete.bind(this);
	}

	get() {
  	let request = new Request(this.props.url + '/parts', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
    	return response.json();
    }).then( data => {
    	console.log('data', data);
      this.setState({ parts: data });
    });
	}

	post() {
		let request = new Request(this.props.url + '/parts', {
			method: 'POST',
			headers: new Headers({'Content-Type': 'application/json'}),
			body: JSON.stringify({
				user: 'Andrew',
				part_number: '12345',
				part_revision: 'A',
				part_name: 'Link',
				customer: 'Andrew'
			})
		});

		fetch(request).then( response => {
			return response.json();
		}).then( data => {
			console.log(data);
		})
	}

	delete(partId) {
  	let request = new Request(this.props.url + '/parts/' + partId, {
  		method: 'DELETE',
  		headers: new Headers({ 'Content-Type': 'application/json' })
  	});

  	fetch(request).then( response => {
  		return response.json();
  	}).then( data => {
  		console.log(data);
  	})
  }

	componentWillMount() {
		this.get();
	}

  render() {
    return (
    	<div>
        <h3>Parts</h3>
        <Table
        	data={this.state.parts}
        	headers={headers.Parts} />
      </div>
    );
  }
}

export default Parts;
