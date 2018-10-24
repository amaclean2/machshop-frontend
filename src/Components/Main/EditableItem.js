import React, { Component } from 'react';
import Select from './Select';
import InputRules from '../AppInformation/InputRules';
import fluxStore from '../../Flux/fluxStore';

class EditableItem extends Component {
  constructor(props) {
    super(props)

    let value = fluxStore.getFormValue(this.props.name) !== undefined ? fluxStore.getFormValue(this.props.name) : '';

    this.state = {
      loaded: false,
      value: value,
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
          output={this.change}
          name={this.props.name}
          value={this.state.value}
          classes={'form-select'}
          data={optionList} />
        )
    } else {
      return null;
    }
  }

  checkSize(e) {
    e = InputRules.checkSize.format(e);
  }

  changeText(e) {
    e = InputRules.textOnly.format(e);
  }

  changeNumber(e) {
    e = InputRules.number.format(e);
  }

  makePhone(e) {
    e = InputRules.phone.format(e);
  }

  makeMath(e) {
    e = InputRules.math.format(e);
  }

  makeMoney(e) {
    e = InputRules.makeMoney.format(e);
  }

  change(e) {
    InputRules.fields(e);

    this.setState({ value: fluxStore.getFormValue(this.props.name) });
  }

  componentWillMount() {
    fluxStore.on('changeForm', () => {
      let fluxValue = fluxStore.getFormValue(this.props.name);
      this.setState({ value: (fluxValue === undefined ? '': fluxValue), loaded: true});
    });
  }

  showType() {
    switch(this.props.type) {
      case 'number' :
        return <input
                  type='text'
                  className={'editable-input'}
                  onChange={this.change}
                  onBlur={this.changeNumber}
                  placeholder={this.props.header.slice(0, -2)}
                  value={this.state.value}
                  name={this.props.name} />

      case 'math' :
        return (
          <div className='math-box form-select'>
            <input
              type='text'
              placeholder={this.props.header.slice(0, -2)}
              onBlur={this.makeMath}
              name={this.props.name}
              value={this.state.value}
              onChange={this.change} />
            <span className="input-hard-text">{this.props.units}</span>
          </div>);
      case 'phone' :
        return (<input
            type='text'
            placeholder={this.props.header.slice(0, -2)}
            onChange={this.makePhone}
            value={this.state.value}
            name={this.props.name} />)
      case 'textOnly' :
        return <input
              type='text'
              placeholder={this.props.header.slice(0, -2)}
              name={this.props.name}
              value={this.state.value}
              onChange={this.change} />;
      case 'date' :
        return <input
                  type='date'
                  className={'editable-input'}
                  onChange={this.change}
                  value={this.state.value}
                  placeholder={this.props.header.slice(0, -2)}
                  name={this.props.name} />

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
            value={this.state.value}
            onChange={this.change} />
        </div>;

      case 'size' :
        return <input
                type='text'
                className={'editable-input'}
                onChange={this.change}
                onBlur={this.checkSize}
                value={this.state.value}
                placeholder={this.props.header.slice(0, -2)}
                name={this.props.name} />;

      case 'textArea' :
        return <textarea
                className='editable-input'
                onChange={this.change}
                value={this.state.value}
                placeholder={this.props.header.slice(0, -2)}
                name={this.props.name}>
              </textarea>;
      default :
        return <input
                type='text'
                className={'editable-input'}
                onChange={this.change}
                value={this.state.value}
                placeholder={this.props.header.slice(0, -2)}
                name={this.props.name} />

    }
  }

  render() {
    let type = this.showType();
    return (
      <span className={'line-item editable ' + this.props.classes} onClick={this.props.onClick} onFocus={this.props.onClick} id="EditableItem">
        <span className='display' >{this.props.header}</span>
        {type}
      </span>
    );
  }
}

export default EditableItem;
