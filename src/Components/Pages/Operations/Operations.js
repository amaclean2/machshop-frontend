import React, { Component } from 'react';
import Operation from './SingleOperation';

class Operations extends Component {
  constructor() {
    super()
    this.state = {
      opCount: 0
    }
    this.addOperation=this.addOperation.bind(this);
  }

	getOperations() {
    let opList = []
    for (var i = 0; i < this.state.opCount; i++) {
      opList.push(<Operation key={i}/>)
    }
		return (<div className="operation-list-container">
        {opList}
      </div>)
	}

  addOperation() {
    this.setState({ opCount: this.state.opCount + 1 });
  }

  render() {
  	let operationList = this.getOperations();
    return (
    	<div>
    		<div className='operations-header-row' >
    			<h4>Operations</h4>
    			<button className="button" onClick={this.addOperation} >Add operation</button>
    		</div>
    		{operationList}
  		</div>);
	}
}

export default Operations;
