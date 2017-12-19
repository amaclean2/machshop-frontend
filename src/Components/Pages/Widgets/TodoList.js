import React, { Component } from 'react';
import DayView from './Calendar/DayView';

class TodoList extends Component {

  render() {
    return (
    	<div className="widget card">
        	<span className="widget-header">Todo List</span>
        	<DayView />
      </div>
    );
  }
}

export default TodoList;
