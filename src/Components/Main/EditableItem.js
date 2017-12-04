import React, { Component } from 'react';

class EditableItem extends Component {

  render() {
    return (
      <span className='line-item'>
        <span className='display' >{this.props.header}</span>
        <input type='text'
          className='editable-input'
          onChange={this.props.change}
          placeholder={this.props.header.slice(0, -2)}
          name={this.props.name}
          defaultValue={this.props.value ? this.props.value : ''} />
      </span>
    );
  }
}

export default EditableItem;
