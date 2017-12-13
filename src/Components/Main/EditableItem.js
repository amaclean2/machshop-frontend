import React, { Component } from 'react';
import Select from './Select';

class EditableItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectList: this.props.data ? this.props.data : []
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.get=this.get.bind(this);
  }

  get() {
    let request = new Request(this.props.url + this.props.link, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log('select loaded');
      this.setState({ selectList: data });
    })
  }

  makeSelect() {
    let optionList = this.state.selectList.map( (option, i) => {
      return (<option key={i} value={option[this.props.name]}>{option[this.props.name]}</option>)
    });
    return (
      <Select output={this.props.output} name={this.props.name} value={this.props.value}>
        <select className='form-select'>
          <option value='default'>{this.props.header.slice(0, -2)}</option>
          {optionList}
        </select>
      </Select>
      )
  }

  showType() {
    switch(this.props.type) {
      case 'number' :
        return <input
                  type='number'
                  className='editable-input'
                  onChange={this.props.change}
                  placeholder={this.props.header.slice(0, -2)}
                  name={this.props.name}
                  defaultValue={this.props.value ? this.props.value : ''} />
      case 'date' :
        return <input
                  type='date'
                  className='editable-input'
                  onChange={this.props.change}
                  placeholder={this.props.header.slice(0, -2)}
                  name={this.props.name}
                  defaultValue={this.props.value ? this.props.value : ''} />
      case 'select' :
        return this.makeSelect()
      default :
        return <input
                  type='text'
                  className='editable-input'
                  onChange={this.props.change}
                  placeholder={this.props.header.slice(0, -2)}
                  name={this.props.name}
                  defaultValue={this.props.value ? this.props.value : ''} />

    }
  }

  componentWillMount() {
    if(this.props.type === 'select' && this.props.url) {
      this.get();
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
