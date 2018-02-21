import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';
import searchableFields from '../../AppInformation/SearchableFields';

class OrderOther extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tools: this.props.data
		}
	}

  render() {
    return (
    	<div className='other-tools'>
        <Table
        	data={this.state.tools}
        	headers={headers.OrderOther}
          searchable={searchableFields.orderOther}
        	toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default OrderOther;