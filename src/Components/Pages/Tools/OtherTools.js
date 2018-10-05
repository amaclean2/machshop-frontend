import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';

class OtherTools extends Component {
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
          addText={'add to inventory'}
        	data={this.state.tools}
        	headers={headers.OtherTools}
        	toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default OtherTools;