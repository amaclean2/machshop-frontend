import React, { Component } from 'react';
import DescriptionItem from '../../../Main/DescriptionItem';

class DayEvent extends Component {

	getTime() {
		let time = this.props.event.start_time,
        hours = time.substring(11, 13),
        minutes = time.substring(14, 16);

    let newHours = hours > 12 ? hours - 12 : hours;

		return newHours + ':' + minutes + (hours > 12 ? ' PM' : ' AM');
	}

  render() {
  	let time = this.getTime();
    return (
    	<div className="day-event card">
    		<DescriptionItem value={this.props.event.event} header="Event: " classes='event-header no-label' />
    		<DescriptionItem value={time} header="Start: " classes='inline-event no-label' /><span className="event-words" >at</span>
        <DescriptionItem value={this.props.event.location} header="Loation: " classes='inline-event no-label' />
				<DescriptionItem value={this.props.event.notes} header="Notes: " classes='inline-event' />
      </div>
    );
  }
}

export default DayEvent;