import React, { Component } from 'react';
// import EditableItem from '../../Main/EditableItem';
import DescriptionItem from '../../Main/DescriptionItem';

class ProcessOperation extends Component {

  render() {
    return (
    	<div className='machine-operation op-meta-data'>
        <DescriptionItem header={'Machine Number: '} value={5} />
        <DescriptionItem header={'Operator: '} value={'Andrew'} />
        <DescriptionItem header={'Parts Started With: '} value={50} />
        <DescriptionItem header={'Parts Finished With: '} value={'-'} />
        <DescriptionItem header={'Setup Time: '} value={'3 hours'} />
        <DescriptionItem header={'Run Time: '} value={'10 minutes'} />
        <button className='button small-button'>Add Setup Sheet</button>

  		</div>);
	}
}

export default ProcessOperation;
