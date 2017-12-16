import React, { Component } from 'react';
import Calendar from './Calendar/Calendar';

class Tools extends Component {
	constructor() {
		super();
		this.state = {
			calendar: false
		}
		this.toggleCalendar=this.toggleCalendar.bind(this);
	}


	viewCalendar() {
		if(this.state.calendar)
			return (<Calendar toggleCalendar={this.toggleCalendar} />);
		else
			return null;
	}

	toggleCalendar() {
		this.setState({ calendar: !this.state.calendar });
	}

  render() {
  	let calendar = this.viewCalendar();
    return (
    	<div className="widget card">
        	<span className="widget-header">Quick Tools</span>
        	<div>
        		<button onClick={this.toggleCalendar} className="button small-button">Calendar</button>
        		{calendar}
        	</div>
      </div>
    );
  }
}

export default Tools;