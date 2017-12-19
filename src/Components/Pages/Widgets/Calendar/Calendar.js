import React, { Component } from 'react';
import DayView from './DayView';
import MonthView from './MonthView';

class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      view: 'month'
    }
    this.toggleViews=this.toggleViews.bind(this);
  }

  toggleViews() {
    this.setState({ view: this.state.view === 'month' ? 'day' : 'month' });
  }

  showViews() {
    if(this.state.view === 'month') {
      return (<MonthView toggleViews={this.toggleViews} />);
    } else {
      return (<DayView toggleViews={this.toggleViews} />);
    }
  }

  render() {
    let view = this.showViews();
    return (
    	<div className="calendar">
        <div className="sidenav-background fade-in" ></div>
        <div className="modal-container">
          <div className="modal-content">
            <div className="calendar-header">
              <button className="button small-button" onClick={this.toggleViews}>
                {this.state.view === 'month' ? 'Day View' : 'Month View'}
              </button>
              <button className="button small-button close-button" onClick={this.props.toggleCalendar} >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            {view}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;