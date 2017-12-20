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
        <select className={'form-select'}>
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
                  className={'editable-input'}
                  onChange={this.props.change}
                  placeholder={this.props.header.slice(0, -2)}
                  name={this.props.name}
                  defaultValue={this.props.value ? this.props.value : ''} />
      case 'date' :
        return <input
                  type='date'
                  className={'editable-input'}
                  onChange={this.props.change}
                  placeholder={this.props.header.slice(0, -2)}
                  name={this.props.name}
                  defaultValue={this.props.value ? this.props.value : ''} />
      case 'select' :
        return this.makeSelect()
      case 'time' :
        return (<div className='time'>
            <Select output={this.props.output} name={'hours'} value={this.props.value}>
              <select className={"time-select"}>
                <option value={1} >01</option>
                <option value={2} >02</option>
                <option value={3} >03</option>
                <option value={4} >04</option>
                <option value={5} >05</option>
                <option value={6} >06</option>
                <option value={7} >07</option>
                <option value={8} >08</option>
                <option value={9} >09</option>
                <option value={10} >10</option>
                <option value={11} >11</option>
                <option value={12} >12</option>
              </select>
            </Select>
            <Select output={this.props.output} name={'minutes'} value={this.props.value}>
              <select className={"time-select"}>
                <option value={0} >00</option>
                <option value={5} >05</option>
                <option value={10} >10</option>
                <option value={15} >15</option>
                <option value={20} >20</option>
                <option value={25} >25</option>
                <option value={30} >30</option>
                <option value={35} >35</option>
                <option value={40} >40</option>
                <option value={45} >45</option>
                <option value={50} >50</option>
                <option value={55} >55</option>
              </select>
            </Select>
            <Select output={this.props.output} name={'period'} value={this.props.value}>
              <select className={"time-select " + this.props.classes}>
                <option value='AM' >AM</option>
                <option value='PM' >PM</option>
              </select>
            </Select>
          </div>)
      default :
        return <input
                  type='text'
                  className={'editable-input'}
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
      <span className={'line-item ' + this.props.classes}>
        <span className='display' >{this.props.header}</span>
        {type}
      </span>
    );
  }
}

export default EditableItem;
