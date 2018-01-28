import React, { Component } from 'react';
import calendarDays from '../../../AppInformation/CalendarDays';
import calendarMonths from '../../../AppInformation/CalendarMonths';
import AddEventForm from './AddEventForm';
import DayEvent from './DayEvent';

class DayView extends Component {
	constructor() {
		super()
		this.showEvents=this.showEvents.bind(this);
	}

	showDate() {
		let title = '';

		title += calendarDays.long[this.props.current.getDay()] + ', ';
		title += calendarMonths[this.props.current.getMonth()];
		title += ' ' + this.props.current.getDate();

		return title;
	}

	showEvents() {

		let day = this.props.current,
				pertinantEvents = this.props.events.filter( event => {
					let format = new Date(event.start_time);

					return format.getFullYear() === day.getFullYear() && format.getMonth() === day.getMonth() && format.getDate() === day.getDate();
				});

			pertinantEvents = pertinantEvents.map( (event, i) => {
				return  <DayEvent event={event} key={i} put={this.props.put} delete={this.props.delete} />;
			})

		return pertinantEvents;
	}

  render() {
  	let events = this.props.events ? this.showEvents() : null;
  	let heading = this.showDate();
    return (
    	<div className="day-view">
    		<span className="widget-header">{heading}</span>
    		<div className="scrollable">
    			<AddEventForm day={this.props.current} saveData={this.props.saveData} />
    			{events}
    		</div>
      </div>
    );
  }
}

export default DayView;