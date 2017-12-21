import React, { Component } from 'react';

class Events extends Component {
	constructor() {
		super()
		this.getEvents=this.getEvents.bind(this);
	}

	getEvents() {
		let pertinantEvents = this.props.events.filter( event => {
			let date = event.start_time,
					year = date.substring(0, 4),
					month = date.substring(5, 7) - 1,
					day = date.substring(8, 10);

			return year === this.props.day.getFullYear().toString() && month === this.props.day.getMonth() && day === this.props.day.getDate().toString();
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
