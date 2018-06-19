import React, { Component } from 'react';
import Select from './Select';
import DrillSizes from '../AppInformation/DrillSizes';
import InputRules from '../AppInformation/InputRules';
import * as fluxActions from '../../Flux/actions';
import fluxStore from '../../Flux/fluxStore';

class EditableItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      value: this.props.value !== '' ? this.props.value : '',
      thisValue: this.props.properties && this.props.properties[this.props.name]
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.makeMath=this.makeMath.bind(this);
    this.change=this.change.bind(this);
    this.makeMoney=this.makeMoney.bind(this);
    this.makePhone=this.makePhone.bind(this);
    this.changeNumber=this.changeNumber.bind(this);
    this.changeText=this.changeText.bind(this);
    this.checkSize=this.checkSize.bind(this);
  }

  makeSelect() {
    if( this.props.properties ) {
      let optionList = this.props.properties;
      return (
        <Select
          output={this.props.output}
          name={this.props.name}
          value={(this.state.value ? this.state.value : this.props.header.slice(0, -2))}
          classes={'form-select'}
          data={optionList} />
        )
    } else {
      return null;
    }
  }

  checkSize(e) {
    e = InputRules.checkSize.format(e, this.change);
  }

  changeText(e) {
    e = InputRules.textOnly.format(e, this.change);
  }

  changeNumber(e) {
    e = InputRules.number.format(e, this.change);
  }

  makePhone(e) {
    e = InputRules.phone.format(e, this.change);
  }

  makeMath(e) {
    e = InputRules.math.format(e, this.change);
  }

  change(e) {
    this.setState({ value: e.target.value });
    let newObject = {};
    newObject[e.target.name] = e.target.value;
    fluxActions.changeForm(newObject);
    this.props.change(e);
  }

  makeMoney(e) {
    e = InputRules.makeMoney.format(e, this.change);
  }

  componentWillReceiveProps(props) {
    switch(props.name) {
      case 'undercut_width' :
        let data = InputRules.fields.undercutWidth.format(props),
            value = data.data.undercut_width;
        this.setState({ value });
    }
  }

  showType() {
    switch(this.props.type) {
      case 'number' :
        return <input
                  type='text'
                  className={'editable-input'}
                  onChange={this.changeNumber}
                  placeholder={this.props.header.slice(0, -2)}
                  name={this.props.name}
                  value={this.state.value} />

      case 'math' :
        return (
          <div className='math-box form-select'>
            <input
              type='text'
              placeholder={this.props.header.slice(0, -2)}
              onBlur={this.makeMath}
              name={this.props.name}
              onChange={this.change}
              value={this.state.value} />
            <span className="input-hard-text">{this.props.units}</span>
          </div>);
      case 'phone' :
        return (<div>
          <input
            type='text'
            placeholder={this.props.header.slice(0, -2)}
            onChange={this.makePhone}
            name={this.props.name}
            value={this.state.value} />
        </div>)
      case 'textOnly' :
        return <input
              type='text'
              placeholder={this.props.header.slice(0, -2)}
              name={this.props.name}
              onChange={this.changeText}
              value={this.state.value} />;
      case 'date' :
        return <input
                  type='date'
                  className={'editable-input'}
                  onChange={this.change}
                  placeholder={this.props.header.slice(0, -2)}
                  name={this.props.name}
                  value={this.state.value} />

      case 'select' :
        return this.makeSelect()

      case 'price' :
        return <div className='price-box form-select'>
          <span className='input-hard-text'>$</span>
          <input
            type='text'
            placeholder='Price'
            onBlur={this.makeMoney}
            name={this.props.name}
            onChange={this.changeNumber}
            value={this.state.value} />
        </div>;

      case 'size' :
        return <input
                type='text'
                className={'editable-input'}
                onChange={this.change}
                onBlur={this.checkSize}
                placeholder={this.props.header.slice(0, -2)}
                name={this.props.name}
                value={this.state.value} />;

      case 'textArea' :
        return <textarea
                className='editable-input'
                onChange={this.change}
                name={this.props.name}
                value={this.state.value}>
              </textarea>;
      default :
        return <input
                type='text'
                className={'editable-input'}
                onChange={this.change}
                placeholder={this.props.header.slice(0, -2)}
                name={this.props.name}
                value={this.state.value} />

    }
  }

  render() {
    let type = this.showType();
    return (
      <span className={'line-item editable ' + this.props.classes} onClick={this.props.onClick} onFocus={this.props.onClick} >
        <span className='display' >{this.props.header}</span>
        {type}
      </span>
    );
  }
}

export default EditableItem;
