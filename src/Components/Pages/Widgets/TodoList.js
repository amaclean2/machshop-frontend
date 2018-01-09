import React, { Component } from 'react';
import DayView from './Calendar/DayView';

class TodoList extends Component {
	constructor() {
		super()
		this.state = {
			events: [],
			loaded: false
		}
		this.post=this.post.bind(this);
		this.get=this.get.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
	}

	get() {
    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/events?company_id=' + id, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ events: data, loaded: true });
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
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/events', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: user,
        company_id: sessionStorage.getItem('user').split(',')[1],
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

  put(user, event, notes, location, startTime, eventId) {
    console.log('here');
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/events/' + eventId, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: user,
        company_id: sessionStorage.getItem('user').split(',')[1],
        event: event,
        notes: notes,
        location: location,
        start_time: startTime
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log(data);
    });
  }

  delete(eventId) {
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/events/' + eventId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log('deleted');
      this.get();
    });
  }

  showTodo() {
  	if(this.state.loaded === true) {
  		return <DayView saveData={this.post} events={this.state.events} current={new Date()} put={this.put} delete={this.delete} />
  	} else {
  		return null;
  	}
  }

  componentDidMount() {
  	this.get();
  }

  render() {
  	let todo = this.showTodo();
    return (
    	<div className="widget card todo">
        	{todo}
      </div>
    );
  }
}

export default TodoList;
