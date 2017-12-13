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
	}

	get() {
	  	let request = new Request(this.props.url + '/parts', {
	      method: 'GET',
	      headers: new Headers({ 'Content-Type': 'application/json' })
	    });

	    fetch(request).then( response => {
	    	return response.json();
	    }).then( data => {
	    	console.log('parts list loaded');
	      this.setState({ parts: data });
	    });
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
        	headers={headers.Parts}
        	link={'/parts/'} />
      </div>
    );
  }
}

export default Parts;
