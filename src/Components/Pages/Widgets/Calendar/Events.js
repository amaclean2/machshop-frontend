import React, { Component } from 'react';

class Events extends Component {

  render() {
    return (
    	<div className="events" onClick={this.props.toggleViews} >
      </div>
    );
  }
}

export default Events;
