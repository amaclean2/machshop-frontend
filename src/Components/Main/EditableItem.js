import React, { Component } from 'react';

class EditableItem extends Component {

  showType() {
    switch(this.props.type) {
      case undefined :
        return <input type='text' className='editable-input' onChange={this.props.change} placeholder={this.props.header.slice(0, -2)} name={this.props.name} defaultValue={this.props.value ? this.props.value : ''} />
      case 'number' :
        return <input type='number' className='editable-input' onChange={this.props.change} placeholder={this.props.header.slice(0, -2)} name={this.props.name} defaultValue={this.props.value ? this.props.value : ''} />
      case 'date' :
        return <input type='date' className='editable-input' onChange={this.props.change} placeholder={this.props.header.slice(0, -2)} name={this.props.name} defaultValue={this.props.value ? this.props.value : ''} />
    }
  }

  render() {
    let type = this.showType();
    return (
      <span className='line-item'>
        <span className='display' >{this.props.header}</span>
        {type}
      </span>
    );
  }
}

export default EditableItem;
