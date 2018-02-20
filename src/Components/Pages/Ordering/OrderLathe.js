import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';
import searchableFields from '../../AppInformation/SearchableFields';

class OrderLathe extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tools: this.props.data
		}
	}

  render() {
    return (
    	<div className='lathe-tools'>
        <Table
        	data={this.state.tools}
        	headers={headers.LatheTools}
          searchable={searchableFields.lathe}
        	toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default OrderLathe;