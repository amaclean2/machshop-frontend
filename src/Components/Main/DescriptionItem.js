import React, { Component } from 'react';
import fluxStore from '../../Flux/fluxStore';

class DescriptionItem extends Component {

  render() {
    let value = fluxStore.getFormValue(this.props.value);

    return (
      <span className={'line-item description ' + this.props.classes}>
        <span className={'display ' + (this.props.disabled ? 'disabled': '')}>{this.props.header}</span>
        <div>
          <span className={(this.props.classes && this.props.classes.indexOf('price') !== -1 ? '' : 'gone')}>$</span>
        	<span className='value' >{value}</span>
        	<span className={'input-hard-text ' + (this.props.value && this.props.units ? 'units-space' : 'gone')}>{this.props.units}</span>
        </div>
      </span>
    );
  }
}

export default DescriptionItem;
