import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';

class OrderLathe extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: props.data
		}
	}

  componentWillReceiveProps(props) {
    this.setState({ data: props.data });
  }

  render() {
    return (
    	<div className='order-lathe' id="Pages/Ordering/OrderLathe">
        <Table
          addText={this.props.source === 'stock' ? 'add a new tool' : 'request a new tool'}
          noAdd={this.props.noAdd}
        	data={this.state.data}
        	headers={(this.props.source === 'stock' ? headers.LatheTools : headers.OrderLathe)}
        	toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default OrderLathe;