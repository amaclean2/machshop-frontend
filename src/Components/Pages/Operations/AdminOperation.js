import React, { Component } from 'react';
import EditableItem from '../../Main/EditableItem';
import DescriptionItem from '../../Main/DescriptionItem';

class AdminOperation extends Component {

  showEdit() {
    if(!this.props.edit) {
      return (
        <div className='machine-operation op-meta-data'>
          <DescriptionItem header={'Creator: '} value={this.props.data.stationData.creator} />
          <DescriptionItem header={'Time Spent: '} value={this.props.data.stationData.time_spent} />
        </div>
      )
    } else {
      return (
        <div className='machine-operation op-meta-data'>
          <EditableItem header={'Creator: '} value={this.props.data.stationData.creator}  change={this.props.change} name={'creator'}/>
          <EditableItem header={'Time Spent: '} value={this.props.data.stationData.time_spent}  change={this.props.change} name={'time_spent'}/>
        </div>
      )
    }
  }

  render() {
    let editable = this.showEdit();
    return (
      <div>{editable}</div>
    );
	}
}

export default AdminOperation;
