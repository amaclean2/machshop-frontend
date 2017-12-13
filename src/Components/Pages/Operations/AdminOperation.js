import React, { Component } from 'react';
// import EditableItem from '../../Main/EditableItem';
import DescriptionItem from '../../Main/DescriptionItem';

class AdminOperation extends Component {

  render() {
    return (
    	<div className='machine-operation op-meta-data'>
        <DescriptionItem header={'Creator: '} value={'Andrew'} />
        <DescriptionItem header={'Time Spent: '} value={'3 hours'} />

  		</div>);
	}
}

export default AdminOperation;
