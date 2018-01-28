import React, { Component } from 'react';
import EditableItem from '../../../Main/EditableItem';


class AddEventForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			event: { date: this.props.day.getTime() },
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
		newInfo.date = newInfo.date - (newInfo.date & 60000);
		this.props.saveData('Andrew', this.state.event.event, this.state.event.notes, this.state.event.location, this.state.event.date);
	}

	componentDidMount() {
		let t = new Date(this.state.event.date);
		t.setHours(1);
		t.setMinutes(0);

	}

  render() {
    return (
    	<div className="form card no-fade">
    		<EditableItem header={'Event: '} value={''} change={this.change} name={'event'} type={'text'} classes={'form-header no-label'} />
    		<EditableItem header={'Notes: '} value={''} change={this.change} name={'notes'} type={'text'} classes={'extra-wide no-label'} />
    		<EditableItem header={'Location: '} value={''} change={this.change} name={'location'} type={'text'} classes={'extra-wide no-label'} />
    		<EditableItem header={'Start Time: '} value={''} name={'start_time'} type={'time'} output={this.output} classes={'no-label'} />
    		<button onClick={this.saveEvent} className="button small-button form-button">Add Event</button>
      </div>
    );
  }
}

export default AddEventForm;