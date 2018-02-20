import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';
import searchableFields from '../../AppInformation/SearchableFields';

class OrderMill extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tools: this.props.data
		}
	}

  render() {
    return (
    	<div className='order-mill'>
        <Table
          data={this.state.tools}
          headers={headers.OrderMill}
          searchable={searchableFields.orderMill}
          toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default OrderMill;