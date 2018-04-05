import React, { Component } from 'react';
import Select from './Select';
import DrillSizes from '../AppInformation/DrillSizes';

class EditableItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectList: [],
      loaded: false,
      value: this.props.value !== '' ? this.props.value : '',
      thisValue: this.props.data && this.props.data[this.props.name]
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.makeMath=this.makeMath.bind(this);
    this.get=this.get.bind(this);
    this.change=this.change.bind(this);
    this.makeMoney=this.makeMoney.bind(this);
    this.makePhone=this.makePhone.bind(this);
    this.changeNumber=this.changeNumber.bind(this);
    this.changeText=this.changeText.bind(this);
    this.checkSize=this.checkSize.bind(this);
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
          value={(this.state.value ? this.state.value : this.props.header.slice(0, -2))}
          classes={'form-select'}
          data={optionList} />
        )
    } else {
      return null;
    }
  }

  checkSize(e) {
    let preVal = e.target.value;

    this.makeMath(e);

    let val = DrillSizes.find( drill => {
      return drill.diameter === e.target.value;
    });

    if(val) e.target.value = val.size;
    else e.target.value = preVal;

    this.change(e);

  }

  changeText(e) {
    e.target.value = e.target.value.replace(/[^A-z`' ]/g, '');

    this.change(e);
  }

  changeNumber(e) {
    let number = e.target.value;
    number = number.replace(/[^0-9.]/g, '');
    if (number.split('.').length > 2) {
      number = number.substr(0, number.length - 1);
    }
    e.target.value = number;
    this.change(e);
  }

  makePhone(e) {
    let number = e.target.value;
    number = number.replace(/[^0-9()\- ]/g, '');

    if(number && number.match(/[0-9]/g).length === 3) {
      number = '(' + number + ') ';

    } else if (number && number.match(/[0-9]/g).length === 6) {
      number = number + '-';

    } else if (number && number.match(/[0-9]/g).length > 10) {
      number = number.substr(0, number.length - 1);
    }

    e.target.value = number;
    this.change(e);
  }

  makeMath(e) {
    let string = e.target.value;

    string = string.toString();
    string = string.replace(/[^0-9\/*+\-.^]/g, '');

    var addends = string.split('+'),
        finished = '';

    addends.forEach( (addend, l) => {
      let subs = addend.split('-');

      subs.forEach( (sub, k) => {
        let factors = sub.split('*'),
            multiplying;

        factors.forEach( (factor, j) => {
          let divisors = factor.split('/');

          divisors.forEach( (divisor, i) => {
            divisor = Number(divisor);
            if(i === 0) {
              factor = divisor;
            } else {
              factor /= divisor;
            }
          });

          factor = Number(factor);
          if(j === 0) {
            sub = factor;
          } else {
            sub *= factor;
          }
        });

        sub = Number(sub);
        if(k === 0) {
          addend = sub;
        } else {
          addend -= sub;
        }
      });

      addend = Number(addend);
      if(l === 0) {
        finished = addend;
      } else {
        finished += addend;
      }
    });

    finished = Math.round(finished * 100000) / 100000;
    finished = finished.toString();

    if(e.target && e.target.value) {
      e.target.value = finished;

      this.change(e);
    } else {
      return finished;
    }
      
  }

  change(e) {
    this.setState({ value: e.target.value });
    this.props.change(e);
  }

  makeMoney(e) {
    let price = Number(e.target.value);
    e.target.value = price.toFixed(2);

    this.change(e);
  }

  componentWillReceiveProps() {
    switch(this.props.name) {
      case 'undercut_width' :
        if(this.props.data && this.props.data.tool_type === 'Endmill' && this.state.value === '') {
          this.setState({ value: this.props.data.diameter });
          this.change({target: { name: this.props.name, value: this.state.value }});
        }
        break;

      case 'diameter' :
        if(this.props.data && this.props.data.tool_type === 'Drill') {
          let val = DrillSizes.find( drill => {
            return drill.size === this.props.data.size;
          });

          let pushed = {target: { name: this.props.name, value: this.props.value }};

          if(val) {
            this.setState({ value: val.diameter });
            this.change({target: { name: this.props.name, value: val.diameter }});
          }
          else if (this.props.value) this.makeMath(pushed);

        }
        break;

      case 'flute_length' :
        if(this.props.data && this.props.data.tool_type === 'Drill') {
          let val = DrillSizes.find(drill => {
            return drill.size === this.props.data.size;
          });
          if(val) {
            this.setState({ value: val.flute_length });
            this.change({target: { name: this.props.name, value: val.flute_length }});
          }
        }
        break;

      case 'tool_length' :
        if(this.props.data && this.props.data.tool_type === 'Drill') {
          let val = DrillSizes.find( drill => {
            return drill.size === this.props.data.size;
          });
          if(val) {
            this.setState({ value: val.oal_length });
            this.change({target: { name: this.props.name, value: val.oal_length }});
          }
        }
        break;

      case 'tip_angle' :
        if(this.props.data && this.props.data.tool_type === 'Drill' && this.state.value === '') {
          this.setState({ value: '118' });
          this.change({target: { name: this.props.name, value: '118' }});
        }
        break;
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
      <span className={'line-item editable ' + this.props.classes} onClick={this.props.onClick} onFocus={this.props.onClick} >
        <span className='display' >{this.props.header}</span>
        {type}
      </span>
    );
  }
}

export default EditableItem;
