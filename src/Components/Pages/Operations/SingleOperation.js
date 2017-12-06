import React, { Component } from 'react';
import EditableItem from '../../Main/EditableItem';
import DescriptionItem from '../../Main/DescriptionItem';
import MillOperation from './MillOperation';

class Operation extends Component {

  render() {
    return (
    	<div className='operation'>
        <div className='op-meta-data'>
          <DescriptionItem header={'Operation Number: '} value={50} />
          <DescriptionItem header={'Operation Name: '} value={'Mill One'} />
          <DescriptionItem header={'Date to Start: '} value={'2018-02-03'} />
          <DescriptionItem header={'Date Started: '} value={'-'} />
          <DescriptionItem header={'Date to Finish: '} value={'2018-02-05'} />
          <DescriptionItem header={'Date Finished: '} value={'-'} />
          <DescriptionItem header={'Station: '} value={'Mill'} />
        </div>
        <MillOperation />
  		</div>);
	}
}

export default Operation;
