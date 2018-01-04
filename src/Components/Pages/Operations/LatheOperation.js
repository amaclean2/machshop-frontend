import React, { Component } from 'react';
import EditableItem from '../../Main/EditableItem';
import DescriptionItem from '../../Main/DescriptionItem';

class LatheOperation extends Component {

  showEdit() {
    if(!this.props.edit) {
      return (
        <div className='machine-operation op-meta-data'>
          <DescriptionItem header={'Machine Number: '} value={this.props.data.station_data.machine_number} />
          <DescriptionItem header={'Operator: '} value={this.props.data.station_data.operator} />
          <DescriptionItem header={'Original Part Count: '} value={this.props.data.station_data.start_count} />
          <DescriptionItem header={'Finished Part Count: '} value={this.props.data.station_data.finish_count} />
          <DescriptionItem header={'Setup Time: '} value={this.props.data.station_data.setup_time} />
          <DescriptionItem header={'Run Time: '} value={this.props.data.station_data.run_time} />
        </div>
      )
    } else {
      return (
        <div className='machine-operation op-meta-data'>
          <EditableItem header={'Machine Number: '} value={this.props.data.station_data.machine_number}  change={this.props.change} name={'machine_number'} type={'number'}/>
          <EditableItem header={'Operator: '} value={this.props.data.station_data.operator}  change={this.props.change} name={'operator'}/>
          <EditableItem header={'Original Part Count: '} value={this.props.data.station_data.start_count}  change={this.props.change} name={'start_count'} type={'number'}/>
          <EditableItem header={'Finished Part Count: '} value={this.props.data.station_data.finish_count}  change={this.props.change} name={'finish_count'} type={'number'}/>
          <EditableItem header={'Setup Time: '} value={this.props.data.station_data.setup_time}  change={this.props.change} name={'setup_time'}/>
          <EditableItem header={'Run Time: '} value={this.props.data.station_data.run_time}  change={this.props.change} name={'run_time'}/>
          <div className='button-bar'><button className='button small-button'>Add Setup Sheet</button></div>
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

export default LatheOperation;

