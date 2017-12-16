import React, { Component } from 'react';
import calendarDays from '../../../AppInformation/CalendarDays';
import calendarMonths from '../../../AppInformation/CalendarMonths';

class MonthView extends Component {
	constructor() {
		super();
		this.state = {
			today: new Date(),
      calArray: []
		}
    this.makeCalendar=this.makeCalendar.bind(this);
	}

  makeCalendar() {
    let today = new Date(),
        month = today.getMonth(),
        year = today.getFullYear(),
        lastOfLastMonth = new Date(year, month, 0).getDate(),
        firstOfThisMonth = new Date(year, month, 1).getDay(),
        lastOfThisMonth = new Date(year, month + 1, 0).getDate(),
        firstCalendarDay = lastOfLastMonth - (firstOfThisMonth - 1),
        weekLength = 7, monthLength = 6,
        calArray = [], weekArray = [];
        
    var i;
    while(calArray.length < monthLength) {
      if(calArray.length === 0) {
        for (i = 0; i < firstOfThisMonth; i++) {
          weekArray.push(firstCalendarDay + i);
        }
        i = 1;
        while(weekArray.length < weekLength) {
          weekArray.push(i);
          i++;
        }
      } else  {
        while(weekArray.length < weekLength) {
          if(i > lastOfThisMonth) {
            i = 1;
          }
          weekArray.push(i);
          i++;
        }
      }
      calArray.push(weekArray);
      weekArray = [];
    }

    this.setState({calArray: calArray});
  }

  drawCalendar() {
    let otherMonth = true;
    let month = this.state.calArray.map( (week, i) => {
      let days = week.map( (day, j) => {
        let today = false;
        if(day === 1 && otherMonth === true) {
          otherMonth = false;
        }
        else if (day === 1 && otherMonth === false) {
          otherMonth = true;
        }
        if(day === new Date().getDate() && !otherMonth) {
          today = true;
        }
        return <li key={(i+1) * j} className={'day ' + (otherMonth ? 'other-month ' : '') + (today ? 'today' : '')}>{day}</li>;
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

  componentWillMount() {
    this.makeCalendar();
  }

  render() {
  	let days = this.showDays();
    let calendar = this.drawCalendar();
    return (
    	<div className="month-view">
    		{calendarMonths[this.state.today.getMonth()] + 
    			', ' + this.state.today.getFullYear()}
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