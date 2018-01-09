import React, { Component } from 'react';

class Events extends Component {
	constructor() {
		super()
		this.getEvents=this.getEvents.bind(this);
	}

	getEvents() {

		let day = new Date(this.props.day.getFullYear(), this.props.day.getMonth(), this.props.day.getDate());
			

		let pertinantEvents = this.props.events.filter( event => {
			let year = event.start_time.substring(0, 4),
					month = event.start_time.substring(5, 7) - 1,
					date = event.start_time.substring(8, 10),
					format = new Date(year, month, date);

			return format.getFullYear() === day.getFullYear() && format.getMonth() === day.getMonth() && format.getDate() === day.getDate();
		});

		pertinantEvents = pertinantEvents.map( (event, i) => {
			return <div className="month-event" key={i} >{event.event}</div>;
		})

		return pertinantEvents;
	}

  render() {
  	let events = this.getEvents();
    return (
    	<div className="events" onClick={() => { this.props.toggleViews(this.props.day) }} >
    		{events}
      </div>
    );
  }
}

export default Events;
