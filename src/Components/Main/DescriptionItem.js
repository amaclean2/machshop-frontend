 import React, { Component } from 'react';

class DescriptionItem extends Component {

  render() {
    return (
      <span className={'line-item description ' + this.props.classes}>
        <span className='display' >{this.props.header}</span>
        <div>
        	<span className='value' >{this.props.value}</span>
        	<span className={'input-hard-text ' + (this.props.value && this.props.units ? 'units-space' : 'gone')}>{this.props.units}</span>
        </div>
      </span>
    );
  }
}

export default DescriptionItem;
