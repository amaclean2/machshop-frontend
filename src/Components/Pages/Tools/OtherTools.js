import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';

class OtherTools extends Component {
	constructor() {
		super()
		this.state = {
			tools: []
		}
		this.get=this.get.bind(this);
	}

	get() {
  	let url = sessionStorage.getItem('user').split(',')[2],
  		id = sessionStorage.getItem('user').split(',')[1],
  		request = new Request(url + '/other?company_id=' + id, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
    	return response.json();
    }).then( data => {
      this.setState({ tools: data });
    });
	}

	componentWillMount() {
		this.get();
	}

  render() {
    return (
    	<div className='other-tools'>
        <Table
        	data={this.state.tools}
        	headers={headers.OtherTools}
        	link={'/tool/other/'} />
      </div>
    );
  }
}

export default OtherTools;