import React, { Component } from 'react';
import DayView from './DayView';
import MonthView from './MonthView';

class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      calArray: [],
      current: new Date(),
      view: 'month',
      events: [],
      loaded: false
    }
    this.toggleViews=this.toggleViews.bind(this);
    this.get=this.get.bind(this);
    this.delete=this.delete.bind(this);
    this.post=this.post.bind(this);
    this.scrollLeft=this.scrollLeft.bind(this);
    this.scrollRight=this.scrollRight.bind(this);
    this.makeCalendar=this.makeCalendar.bind(this);
  }

  toggleViews(date) {
    if(date) {
      this.setState({ current: date });
    } else if (this.state.view === 'month') {
      this.setState({ current: new Date() });
      this.makeCalendar();
    }
    this.setState({ view: this.state.view === 'month' ? 'day' : 'month' });
  }

  showViews() {
    if(this.state.loaded === true) {
      if(this.state.view === 'month') {
        return (<MonthView toggleViews={this.toggleViews} events={this.state.events} current={this.state.current} calArray={this.state.calArray} />);
      } else {
        return (<DayView toggleViews={this.toggleViews} saveData={this.post} events={this.state.events} current={this.state.current} />);
      }
    } else {
      return <div>Loading...</div>;
    }
      
  }

  get() {

    let request = new Request(this.props.url + '/events', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ events: data, loaded: true });
      console.log('all events loaded');
    });
  }

  post(
    user,
    event,
    notes,
    location,
    startTime
    ) {
    startTime.setHours(startTime.getHours() - 8);
    let request = new Request(this.props.url + '/events', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: user,
        event: event,
        notes: notes,
        location: location,
        start_time: startTime
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.get();
    });
  }

  delete(eventId) {
    let request = new Request(this.props.url + '/events/' + eventId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.get();
    });
  }

  componentWillMount() {
    this.get();
    this.makeCalendar();
  }

  scrollLeft() {
    let current = this.state.current;
    if(this.state.view === 'month') {
      current.setMonth(current.getMonth() - 1);
    } else {
      current.setDate(current.getDate() - 1);
    }
    this.setState({ current: current });
    this.makeCalendar();
  }

  scrollRight() {
    let current = this.state.current;
    if(this.state.view === 'month') {
      current.setMonth(current.getMonth() + 1);
    } else {
      current.setDate(current.getDate() + 1);
    }
    this.setState({ current: current });
    this.makeCalendar();
  }

  makeCalendar() {
    let today = this.state.current,
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

  render() {
    let view = this.showViews();
    return (
    	<div className="calendar">
        <div className="sidenav-background fade-in" ></div>
        <div className="modal-container">
          <div className="modal-content">
            <div className="calendar-header">
              <button className="button small-button" onClick={() => {this.toggleViews()}}>
                {this.state.view === 'month' ? 'Day View' : 'Month View'}
              </button>
              <button className="button small-button scroll-button" onClick={this.scrollLeft} >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </button>
              <button className="button small-button scroll-button" onClick={this.scrollRight} >
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
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