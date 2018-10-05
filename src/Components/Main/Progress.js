import React, { Component } from 'react';

class Progress extends Component {

  render() {
    return (
      <div className='progress'>
        <div className={'progress-slide ' + (this.props.activated ? 'grow ' : '')}></div>
      </div>
    );
  }
}

export default Progress;
