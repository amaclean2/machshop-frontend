import React, { Component } from 'react';
import DescriptionItem from '../../../Main/DescriptionItem';
import EditableItem from '../../../Main/EditableItem';

class DayEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      data: this.props.event
    }
    this.toggleEdit=this.toggleEdit.bind(this);
    this.output=this.output.bind(this);
    this.change=this.change.bind(this);
    this.saveEvent=this.saveEvent.bind(this);
  }

  saveEvent() {
    this.props.put(
      this.state.data.user,
      this.state.data.event,
      this.state.data.notes,
      this.state.data.location,
      this.state.data.start_time,
      this.state.data._id);
    this.toggleEdit();
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  output(value, label) {
    let newInfo = this.state.data;
    if(typeof(newInfo.start_time) === 'string') {
      let time = new Date(newInfo.start_time);
      
      newInfo.start_time = time;
    }

    if(label === 'hours') {
      newInfo.start_time.setHours(value);
    } else if (label === 'minutes') {
      newInfo.start_time.setMinutes(value);
    } else if (label === 'period') {
      newInfo.start_time.setHours(newInfo.start_time.getHours() + (value === 'AM' ? 0 : 12));
    }
  }

  change(e) {
    let newInfo = this.state.data;
    newInfo[e.target.name] = e.target.value;
  }

  showViews() {
    let time = this.getTime();
    if(this.state.edit) {
      return (<div className='day-event card event-no-fade form'>
          <EditableItem value={this.props.event.event} header="Event: " classes='event-header' change={this.change} name={'event'} type={'text'}/>
          <EditableItem value={time} header="Start: " output={this.output} classes='event-header' name={'start_time'} type={'time'}/>
          <EditableItem value={this.props.event.location} header="Location: " classes='event-header' change={this.change} name={'location'} type={'text'}/>
          <EditableItem value={this.props.event.notes} header="Notes: "  classes='event-header' change={this.change} name={'notes'} type={'text'}/>
          <button className='button small-button' onClick={this.saveEvent} >Save</button>
          <button
            className='button table-button delete-button small-delete'
            onClick={() => { this.props.delete(this.props.event._id); }}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        </div>);
    } else {
      return (<div className='day-event card' onClick={this.toggleEdit}>
          <DescriptionItem value={this.props.event.event} header="Event: " classes='event-header no-label' />
          <DescriptionItem value={time} header="Start: " classes='no-label' /><span className="event-words" >at</span>
          <DescriptionItem value={this.props.event.location} header="Location: " classes='no-label' />
          <DescriptionItem value={this.props.event.notes} header="Notes: " />
        </div>);
    }
  }

	getTime() {
		let time = this.props.event.start_time,
        hours = new Date(time).getHours(),
        minutes = new Date(time).getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let newHours = hours > 12 ? hours - 12 : hours;

		return newHours + ':' + minutes + (hours > 12 ? ' PM' : ' AM');
	}

  render() {
    let view = this.showViews();
    return (
    	<div>
    		{view}
      </div>
    );
  }
}

export default DayEvent;