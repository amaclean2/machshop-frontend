import React, { Component } from 'react';
import Select from './Select';
import DateComp from './Date';
import InputRules from '../AppInformation/InputRules';
import fluxStore from '../../Flux/fluxStore';

class EditableItem extends Component {
  constructor(props) {
    super(props)

    let value = fluxStore.getFormValue(props.name, props.additionalData) !== undefined ? fluxStore.getFormValue(props.name, props.additionalData) : '';

    this.state = {
      loaded: false,
      value: value,
      thisValue: this.props.properties && this.props.properties[this.props.name]
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.makeDate=this.makeDate.bind(this);
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

  makeDate() {
    return (<DateComp 
              classes={'date-picker'}
              time={this.props.time}
              value={new Date().getTime()}/>);
  }

  checkSize(e) {
    e = InputRules.checkSize.format(e, this.props.additionalData);
  }

  changeText(e) {
    e = InputRules.textOnly.format(e, this.props.additionalData);
  }

  changeNumber(e) {
    e = InputRules.number.format(e, this.props.additionalData);
  }

  makePhone(e) {
    e = InputRules.phone.format(e, this.props.additionalData);
  }

  makeMath(e) {
    e = InputRules.math.format(e, this.props.additionalData);
  }

  makeMoney(e) {
    e = InputRules.makeMoney.format(e, this.props.additionalData);
  }

  change(e) {
    InputRules.fields(e, this.props.additionalData);
    if (this.props.additionalFunction) this.props.additionalFunction();
  }

  componentWillMount() {
    fluxStore.on('changeForm', () => {
      let fluxValue = fluxStore.getFormValue(this.props.name, this.props.additionalData);

      this.setState({ value: (fluxValue === undefined ? '': fluxValue), loaded: true});
    });
  }

  showType() {
    switch(this.props.type) {
      case 'number' :
        return <div className="math-box form-select">
                  <input
                    type='text'
                    className={'editable-input'}
                    onChange={this.change}
                    onBlur={this.changeNumber}
                    value={this.state.value}
                    name={this.props.name} />
                  <span className="input-hard-text">{this.props.units}</span>
                </div>

      case 'math' :
        return (
          <div className='math-box form-select'>
            <input
              type='text'
              onBlur={this.makeMath}
              name={this.props.name}
              value={this.state.value}
              onChange={this.change} />
            <span className="input-hard-text">{this.props.units}</span>
          </div>);
      case 'phone' :
        return (<input
            type='text'
            onChange={this.makePhone}
            value={this.state.value}
            name={this.props.name} />)
      case 'textOnly' :
        return <input
              type='text'
              name={this.props.name}
              value={this.state.value}
              onChange={this.change} />;
      case 'date' :
        return this.makeDate()
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
                name={this.props.name} />;

      case 'textArea' :
        return <textarea
                className='editable-input'
                onChange={this.change}
                value={this.state.value}
                name={this.props.name}>
              </textarea>;
      default :
        return <input
                type='text'
                className={'editable-input'}
                onChange={this.change}
                value={this.state.value}
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
