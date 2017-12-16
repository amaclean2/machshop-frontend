import React, { Component } from 'react';
import calendarDays from '../../../AppInformation/CalendarDays';
import calendarMonths from '../../../AppInformation/CalendarMonths';

class MonthView extends Component {
	constructor() {
		super();
		this.state = {
			today: new Date()
		}
	}

	showDays() {
		let days = calendarDays.long.map( (day, i) => {
			return (<div key={i} className="day-header">{day}</div>);
		})

		return days;
	}

  render() {
  	let days = this.showDays();
    return (
    	<div className="month-view">
    		{calendarMonths[this.state.today.getMonth()] + 
    			', ' + this.state.today.getFullYear()}
    		<div className="calendar-body">
    			<div className="day-headers">
    				{days}
    			</div>
    		</div>
      </div>
    );
  }
}

export default MonthView;