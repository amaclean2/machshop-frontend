import React, { Component } from 'react';

import Table from '../../Main/Table';
import headers from '../../AppInformation/TableHeaders';

class LatheTools extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tools: this.props.data
		}
	}

  render() {
    return (
    	<div className='lathe-tools' id="Tools/LatheTools">
        <Table
          addText={'add to inventory'}
        	data={this.state.tools}
        	headers={headers.LatheTools}
        	toggleModal={this.props.toggleModal} />
      </div>
    );
  }
}

export default LatheTools;