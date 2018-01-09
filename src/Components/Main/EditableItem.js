import React, { Component } from 'react';
import Select from './Select';

class EditableItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectList: this.props.data ? this.props.data : [],
      loaded: false
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.get=this.get.bind(this);
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
    if(this.state.loaded) {
      let optionList = this.state.selectList.map( item => {
        return { value: item.part_number, children: item.part_number };
      });
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
                </div>)

/*        let hours, minutes, period;
        switch(this.props.value.length) {
          case 7 :
            hours = this.props.value.substr(0, 1);
            minutes = this.props.value.substr(2, 2);
            period = this.props.value.substr(5, 2); 
            break;
          case 8 :
            hours = this.props.value.substr(0, 2);
            minutes = this.props.value.substr(3, 2);
            period = this.props.value.substr(6, 2);
            if(hours[1] === ':') {
              hours = this.props.value.substr(0, 1);
              minutes = this.props.value.substr(2, 2);
              period = this.props.value.substr(5, 2);
            }
            break;
          case 6 :
            break;
        }

        this.setState({ selectList: [
            { value: 1, children: '01' },
            { value: 2 children: '02' },
            { value: 3 children: '03' },
            { value: 4 children: '04' },
            { value: 5 children: '05' },
            { value: 6 children: '06' },
            { value: 7 children: '07' },
            { value: 8 children: '08' },
            { value: 9 children: '09' },
            { value: 10 children: '10' },
            { value: 11 children: '11' },
            { value: 12 children: '12' },
          ]});

       return (<div className='time'>
            <Select output={this.props.output} name={'hours'} value={this.props.value.substr(0, 1)}>
              <select className={"time-select"}>
                <option value={1} >1</option>
                <option value={2} >2</option>
                <option value={3} >3</option>
                <option value={4} >4</option>
                <option value={5} >5</option>
                <option value={6} >6</option>
                <option value={7} >7</option>
                <option value={8} >8</option>
                <option value={9} >9</option>
                <option value={10} >10</option>
                <option value={11} >11</option>
                <option value={12} >12</option>
              </select>
            </Select>
            <Select output={this.props.output} name={'minutes'} value={this.props.value.substr(2, 2)}>
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
            <Select output={this.props.output} name={'period'} value={this.props.value.substr(5, 2)}>
              <select className={"time-select"}>
                <option value='AM' >AM</option>
                <option value='PM' >PM</option>
              </select>
            </Select>
          </div>) */
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
    if(this.props.type === 'select' && !this.props.data) {
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
