import React, { Component } from 'react';
import Select from './Select';

class EditableItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectList: [],
      loaded: false,
      value: this.props.value !== '' ? this.props.value : ''
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.makeMath=this.makeMath.bind(this);
    this.get=this.get.bind(this);
    this.change=this.change.bind(this);
  }

  get() {
    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + this.props.link + '?company_id=' + id, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ selectList: data, loaded: true });
    })
  }

  makeSelect() {
    if( this.state.loaded || this.props.data ) {
      let optionList = this.state.loaded ? this.state.selectList.map( item => {
        return { value: item[this.props.name], children: item[this.props.name] };
      }) : this.props.data;
      return (
        <Select
          output={this.props.output}
          name={this.props.name}
          value={(this.props.value ? this.props.value : this.props.header.slice(0, -2))}
          classes={'form-select'}
          data={optionList} />
        )
    } else {
      return null;
    }
  }

  makeMath(e) {
    let string = e.target.value
    if(string.indexOf('/') !== -1) {
      let strings = string.split('/');
      e.target.value = strings[0];
      strings.splice(0, 1);
      strings.forEach( item => { e.target.value /= item; });
    } 
    if (string.indexOf('*') !== -1) {
      let strings = string.split('*');
      e.target.value = strings[0];
      strings.splice(0, 1);
      strings.forEach( item => { e.target.value *= item; });
    } 
    if (string.indexOf('-') !== -1) {
      let strings = string.split('-');
      e.target.value = strings[0];
      strings.splice(0, 1);
      strings.forEach( item => { e.target.value -= item; });
    } 
    if (string.indexOf('+') !== -1) {
      let strings = string.split('+');
      e.target.value = strings[0];
      strings.splice(0, 1);
      strings.forEach( item => { e.target.value = +e.target.value + +item; });
    }
    if(e.target.value === 'NaN') {
      e.target.value = string;
    }
    this.change(e);
  }

  change(e) {
    this.setState({ value: e.target.value });
    this.props.change(e);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.name === 'undercut_width')
      this.setState({ value: nextProps.value }); 

  }

  showType() {
    switch(this.props.type) {
      case 'number' :
        return <input
                  type='number'
                  className={'editable-input'}
                  onChange={this.change}
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

      case 'time' :
        let hourRange = [
          { value: '01', children: '01' },
          { value: '02', children: '02' },
          { value: '03', children: '03' },
          { value: '04', children: '04' },
          { value: '05', children: '05' },
          { value: '06', children: '06' },
          { value: '07', children: '07' },
          { value: '08', children: '08' },
          { value: '09', children: '09' },
          { value: '11', children: '11' },
          { value: '12', children: '12' }
        ],
        minuteRange = [
          { value: '00', children: '00' },
          { value: '05', children: '05' },
          { value: '10', children: '10' },
          { value: '15', children: '15' },
          { value: '20', children: '20' },
          { value: '25', children: '25' },
          { value: '30', children: '30' },
          { value: '35', children: '35' },
          { value: '40', children: '40' },
          { value: '45', children: '45' },
          { value: '50', children: '50' },
          { value: '55', children: '55' }
        ],
        periodRange = [
          { value: 'AM', children: 'AM' },
          { value: 'PM', children: 'PM' }
        ];

        return (<div className="time-row">
                  <Select output={this.props.output} name={'hours'} data={hourRange} classes={'time-select editable-input'} />
                  <Select output={this.props.output} name={'minutes'} data={minuteRange} classes={'time-select editable-input'} />
                  <Select output={this.props.output} name={'period'} data={periodRange} classes={'time-select editable-input'} />
                </div>);
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

  componentWillMount() {
    if(this.props.type === 'select' && !this.props.data) {
      this.get();
    }
  }

  render() {
    let type = this.showType();
    return (
      <span className={'line-item ' + this.props.classes} onClick={this.props.onClick} onFocus={this.props.onClick} >
        <span className='display' >{this.props.header}</span>
        {type}
      </span>
    );
  }
}

export default EditableItem;
