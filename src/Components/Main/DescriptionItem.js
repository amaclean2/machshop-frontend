import React, { Component } from 'react';

class DescriptionItem extends Component {

  render() {
    return (
      <span className='line-item'>
        <span className='display' >{this.props.header}</span>
        <span className='value' >{this.props.value}</span>
      </span>
    );
  }
}

export default DescriptionItem;
