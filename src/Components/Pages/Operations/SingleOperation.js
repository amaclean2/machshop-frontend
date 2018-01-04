import React, { Component } from 'react';
import EditableItem from '../../Main/EditableItem';
import DescriptionItem from '../../Main/DescriptionItem';
import MillOperation from './MillOperation';
import LatheOperation from './LatheOperation';
import SawOperation from './SawOperation';
import AdminOperation from './AdminOperation';
import InspectOperation from './InspectOperation';
import ProcessOperation from './ProcessOperation';

class Operation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: !this.props.data,
      opData: this.props.data ? this.props.data : { station: 'administration', station_data: {} },
      stationData: [
        {station: 'mill'},
        {station: 'lathe'},
        {station: 'inspection'},
        {station: 'saw'},
        {station: 'processing'},
        {station: 'administration'}
      ]
    }
    this.toggleEdit=this.toggleEdit.bind(this);
    this.change=this.change.bind(this);
    this.selectOutput=this.selectOutput.bind(this);
    this.save=this.save.bind(this);
    this.changeStationData=this.changeStationData.bind(this);
  }

  save() {
    this.toggleEdit();
    this.props.saveNewOperation(this.state.opData, this.props.index);
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit});
  }

  change(e) {
    let newData = this.state.opData;
    newData[e.target.name] = e.target.value;
    this.setState({ opData: newData });
  }

  changeStationData(e) {
    let opData = this.state.opData;

    opData.station_data[e.target.name] = e.target.value;
    this.setState({ opData });
  }

  selectOutput(value, name) {
    let newData = this.state.opData;
    newData[name] = value;
    this.setState({ opData: newData, station: value });
  }

  selectStation() {
    switch (this.state.opData.station) {
      case 'mill' :
        return <MillOperation edit={this.state.edit} change={this.changeStationData} data={this.state.opData} />
      case 'lathe' :
        return <LatheOperation edit={this.state.edit} change={this.changeStationData} data={this.state.opData} />
      case 'saw' :
        return <SawOperation edit={this.state.edit} change={this.changeStationData} data={this.state.opData} />
      case 'administration' :
        return <AdminOperation edit={this.state.edit} change={this.changeStationData} data={this.state.opData} />
      case 'processing' :
        return <ProcessOperation edit={this.state.edit} change={this.changeStationData} data={this.state.opData} />
      case 'inspection' :
        return <InspectOperation edit={this.state.edit} change={this.changeStationData} data={this.state.opData} />
      default :
        return <AdminOperation edit={this.state.edit} change={this.changeStationData} data={this.state.opData} />
    }
  }

  viewInfo() {
    let station = this.selectStation();
    if(!this.state.edit) {
      return (
        <div className='operation fade-in' onClick={this.toggleEdit} >
          <div className='op-meta-data'>
            <DescriptionItem header={'Operation Number: '} value={this.state.opData.operation_number} />
            <DescriptionItem header={'Operation Name: '} value={this.state.opData.operation_name} />
            <DescriptionItem header={'Description: '} value={this.state.opData.description} />
            <DescriptionItem header={'Date to Start: '} value={this.state.opData.date_to_start} />
            <DescriptionItem header={'Date to Finish: '} value={this.state.opData.date_to_finish} />
            <DescriptionItem header={'Date Started: '} value={this.state.opData.date_started} />
            <DescriptionItem header={'Date Finished: '} value={this.state.opData.date_finished} />
            <DescriptionItem header={'Station: '} value={this.state.opData.station} />
          </div>
          {station}
        </div>);
    } else {
      return (
        <div className='operation no-fade fade-in'>
          <div className='op-meta-data'>
            <EditableItem
              header={'Operation Number: '}
              value={this.state.opData.operation_number}
              change={this.change} name={'operation_number'}
              type={'number'} />
            <EditableItem
              header={'Operation Name: '}
              value={this.state.opData.operation_name}
              change={this.change}
              name={'operation_name'}
              type={'text'} />
            <EditableItem
              header={'Description: '}
              value={this.state.opData.description}
              change={this.change}
              name={'description'}
              type={'text'} />
            <EditableItem
              header={'Date to Start: '}
              value={this.state.opData.date_to_start}
              change={this.change}
              name={'date_to_start'}
              type={'date'} />
            <EditableItem
              header={'Date to Finish: '}
              value={this.state.opData.date_to_finish}
              change={this.change}
              name={'date_to_finish'}
              type={'date'} />
            <DescriptionItem
              header={'Date Started: '}
              value={this.state.opData.date_started} />
            <DescriptionItem
              header={'Date Finished: '}
              value={this.state.opData.date_finished} />
            <EditableItem
              header={'Station: '}
              value={this.state.opData.station ? this.state.opData.station : 'administration'}
              type={'select'}
              data={this.state.stationData}
              output={this.selectOutput}
              name={'station'} />
          </div>
          {station}
          <div className="button-bar">
            <button className="button small-button delete-button" onClick={() => {this.props.deleteOperation(this.props.index)}} >Delete</button>
            <button className="button small-button" onClick={this.save}>Save</button>
          </div>
        </div>)
    }
  }

  render() {
    let info = this.viewInfo();
    return (
    	<div>
        {info}
      </div>);
	}
}

export default Operation;
