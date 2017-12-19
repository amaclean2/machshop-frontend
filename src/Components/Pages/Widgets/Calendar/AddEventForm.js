import React, { Component } from 'react';
import EditableItem from '../../../Main/EditableItem';


class AddEventForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			event: { date: this.props.day },
		}
		this.change=this.change.bind(this);
		this.output=this.output.bind(this);
		this.saveEvent=this.saveEvent.bind(this);
	}

	change(e) {
		let newInfo = this.state.event;
		newInfo[e.target.name] = e.target.value;
	}

	output(value, label) {
		let newInfo = this.state.event;
		if(label === 'hours') {
			newInfo.date.setHours(value);
		} else if (label === 'minutes') {
			newInfo.date.setMinutes(value);
		} else if (label === 'period') {
			newInfo.date.setHours(newInfo.date.getHours() + (value === 'AM' ? 0 : 12));
		}
	}

	saveEvent() {
		let newInfo = this.state.event;
		newInfo.date.setSeconds(0);
		console.log('event', this.state.event);
	}

  render() {
    return (
    	<div className="form card">
    		<EditableItem header={'Event: '} value={''} change={this.change} name={'event'} type={'text'} />
    		<EditableItem header={'Location: '} value={''} change={this.change} name={'location'} type={'text'} />
    		<EditableItem header={'Start Time: '} value={''} change={this.change} name={'start_time'} type={'time'} output={this.output} />
    		<button onClick={this.saveEvent} className="button small-button">Add Event</button>
      </div>
    );
  }
}

export default AddEventForm;