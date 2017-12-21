import React, { Component } from 'react';
import calendarDays from '../../../AppInformation/CalendarDays';
import calendarMonths from '../../../AppInformation/CalendarMonths';
import Events from './Events';

class MonthView extends Component {
	constructor() {
		super();
		this.state = {
      month: new Date().getMonth(),
      year: new Date().getFullYear()
		}
	}

  drawCalendar() {
    let otherMonth = true;
    let month = this.props.calArray.map( (week, i) => {
      let days = week.map( (day, j) => {
        let today = false;
        if(day === 1 && otherMonth === true) {
          otherMonth = false;
        }
        else if (day === 1 && otherMonth === false) {
          otherMonth = true;
        }
        if(day === new Date().getDate() && !otherMonth && this.props.current.getMonth() === new Date().getMonth()) {
          today = true;
        }
        
        return <li key={(i+1) * j} className={'day ' + (otherMonth ? 'other-month ' : '') + (today ? 'today' : '')}>
                {day}
                <Events day={new Date(this.props.current.getFullYear(), this.props.current.getMonth(), day)} toggleViews={this.props.toggleViews} events={this.props.events} />
              </li>;
      })
      return (
        <li key={i+1}>
          <ul className='week'>
            {days}
          </ul>
        </li>);
    })
    return <ul>{month}</ul>
  }

	showDays() {
		let days = calendarDays.long.map( (day, i) => {
			return (<div key={i} className="day-header">{day}</div>);
		})

		return days;
	}

  render() {
  	let days = this.showDays();
    let calendar = this.drawCalendar();
    return (
    	<div className="month-view">
    		<span className="widget-header">{calendarMonths[this.props.current.getMonth()] + 
    			', ' + this.props.current.getFullYear()}</span>
    		<div className="calendar-body">
    			<div className="day-headers">
    				{days}
    			</div>
          <div>
            {calendar}
          </div>
    		</div>
      </div>
    );
  }
}

export default MonthView;