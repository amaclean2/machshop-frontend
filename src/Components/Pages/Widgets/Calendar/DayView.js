import React, { Component } from 'react';
import calendarDays from '../../../AppInformation/CalendarDays';
import calendarMonths from '../../../AppInformation/CalendarMonths';
import AddEventForm from './AddEventForm';


class DayView extends Component {
	constructor() {
		super()
		this.state = {
			day: new Date()
		}
	}

	showDate() {
		let title = '';

		title += calendarDays.long[this.state.day.getDay()] + ', ';
		title += calendarMonths[this.state.day.getMonth()];
		title += ' ' + this.state.day.getDate();

		return title;
	}

  render() {
  	let heading = this.showDate();
    return (
    	<div className="day-view">
    		{heading}
    		<AddEventForm day={this.state.day}/>
      </div>
    );
  }
}

export default DayView;