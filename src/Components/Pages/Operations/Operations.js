import React, { Component } from 'react';
import Operation from './SingleOperation';

class Operations extends Component {

	getOperations() {
		return (<div><Operation /><Operation /></div>)
	}

  render() {
  	let operationList = this.getOperations();
    return (
    	<div>
    		<div className='operations-header-row' >
    			<h4>Operations</h4>
    			<button className="button">Add operation</button>
    		</div>
    		{operationList}
  		</div>);
	}
}

export default Operations;
