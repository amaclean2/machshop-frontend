import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';

class OrderMill extends Component {
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
    	<div className='order-mill' id="Ordering/OrderMill">
        <Table
          addText={this.props.source === 'stock' ? 'add a new tool' : 'request a new tool'}
          noAdd={this.props.noAdd}
          data={this.state.data}
          headers={(this.props.source === 'stock' ? headers.MillTools : headers.OrderMill)}
          toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default OrderMill;