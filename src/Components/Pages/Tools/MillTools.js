import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';

class MillTools extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tools: this.props.data
		}
	}

  render() {
    return (
    	<div className='mill-tools'>
        <Table
          addText={'add to inventory'}
          data={this.state.tools}
          headers={headers.MillTools}
          toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default MillTools;
