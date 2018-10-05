import React, { Component } from 'react';
// import Operation from './SingleOperation';

class Operations extends Component {

	// getOperations() {
 //    let opList = [],
 //        operations = this.props.data.operations.sort((a, b) => {
 //          if(a.operation_number < b.operation_number)
 //            return -1;
 //          if(a.operation_number > b.operation_number)
 //            return 1;
 //          return 0;
 //        })

 //    for (var i = 0; i < this.props.operationCount; i++) {
 //      opList.push(<Operation
 //                    key={i}
 //                    index={i}
 //                    data={this.props.data.operations[i]}
 //                    saveNewOperation={this.props.saveNewOperation}
 //                    deleteOperation={this.props.deleteOperation} />)
 //    }
	// 	return (<div className="operation-list-container">
 //        {opList}
 //      </div>)
	// }


  render() {
  	let operationList = this.getOperations();
    return (
    	<div>
    		<div className='operations-header-row' >
    			<h4>Operations</h4>
    			<button className="button" onClick={this.props.addOperation} >Add operation</button>
    		</div>
    		{operationList}
  		</div>);
	}
}

export default Operations;
