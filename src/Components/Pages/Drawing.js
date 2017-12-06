import React, { Component } from 'react';

class Drawing extends Component {

  render() {
    return (
      <div>
        <div className='drawing-header'>
          <h4>{this.props.partNumber}</h4>
          <button className='button small-button'>add new drawing</button>
          <div className='flex-spacer'></div>
          <span>54321.pdf</span>
          <span>11.25mb</span>
        </div>
      </div>
    );
  }
}

export default Drawing;
