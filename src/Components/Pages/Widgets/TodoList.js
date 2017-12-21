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

  showTodo() {
  	if(this.state.loaded === true) {
  		return <DayView saveData={this.post} events={this.state.events} current={new Date()} />
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
