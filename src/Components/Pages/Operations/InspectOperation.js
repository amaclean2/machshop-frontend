import React, { Component } from 'react';
// import EditableItem from '../../Main/EditableItem';
import DescriptionItem from '../../Main/DescriptionItem';

class InspectOperation extends Component {

  render() {
    return (
    	<div className='machine-operation op-meta-data'>
        <DescriptionItem header={'Inspector: '} value={'Andrew'} />
        <DescriptionItem header={'Parts Inspected: '} value={'-'} />
        <DescriptionItem header={'Inspection Time: '} value={'3 hours'} />
        <button className='button small-button'>Add Inspection Sheet</button>

  		</div>);
	}
}

export default InspectOperation;
