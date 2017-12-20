import React, { Component } from 'react';
import DayView from './DayView';
import MonthView from './MonthView';

class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      view: 'month',
      events: [],
      loaded: false
    }
    this.toggleViews=this.toggleViews.bind(this);
    this.get=this.get.bind(this);
    this.delete=this.delete.bind(this);
    this.post=this.post.bind(this);
  }

  toggleViews() {
    this.setState({ view: this.state.view === 'month' ? 'day' : 'month' });
  }

  showViews() {
    if(this.state.loaded === true) {
      if(this.state.view === 'month') {
        return (<MonthView toggleViews={this.toggleViews} events={this.state.events} />);
      } else {
        return (<DayView toggleViews={this.toggleViews} saveData={this.post} events={this.state.events} />);
      }
    } else {
      return <div>Loading</div>;
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
        console.log(data);
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
      console.log(data);
    });
  }

  componentWillMount() {
    // this.delete('5a398ab02dc9dc4f8eff080e');
    this.get();
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