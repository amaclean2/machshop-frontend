import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';

class MillTools extends Component {
	constructor() {
		super()
		this.state = {
			tools: [],
      loaded: false
		}
		this.get=this.get.bind(this);
	}

	get() {
  	let url = sessionStorage.getItem('user').split(',')[2],
  		id = sessionStorage.getItem('user').split(',')[1],
  		request = new Request(url + '/mill?company_id=' + id, {
      method: 'GET'
    });

    fetch(request).then( response => {
    	return response.json();
    }).then( data => {
      this.setState({ tools: data, loaded: true });
    });
	}

  showTable() {
    if(this.state.loaded) {
      return <Table
          data={this.state.tools}
          headers={headers.MillTools}
          link={'/tool/mill/'} />;
    } else {
      return null;
    }
  }

	componentWillMount() {
    this.setState({ loaded: false });
		this.get();
	}

  render() {
    let table = this.showTable();
    return (
    	<div className='mill-tools'>
        {table}
      </div>
    );
  }
}

export default MillTools;
