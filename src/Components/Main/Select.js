import React, { Component } from 'react';

class Select extends Component {
  constructor() {
    super()
    this.state = {
      shown: false,
      data: [],
      chosen: {},
      classes: ''
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.toggleShown=this.toggleShown.bind(this);
    this.selectItem=this.selectItem.bind(this);
    this.getClasses=this.getClasses.bind(this);
    this.arrows=this.arrows.bind(this);
  }

  getClasses() {
    if(this.props.classes) {
      let classes = this.state.classes;
      classes += this.props.classes + ' ';
      this.setState({ classes });
    }
  }

  makeSelect(props) {
    let data;
    if(props.data) {
      data = props.data;
    }

    data.forEach( item => {
      item.selected = false;
    });
    if(data.length) {
      if(props.value) {
        let selected = data.find( item => {
          return item.value === props.value[0];
        });

        selected ? selected.selected = true : data[0].selected = true;
      } else {
        data[0].selected = true;
      }
    }

    this.setState({ data, chosen: (props.value ? { value: props.value[0], children: props.value[1] } : data[0]) });
  }

  componentDidMount() {
    this.getClasses();
    this.makeSelect(this.props);
  }

  componentWillReceiveProps(props) {
    this.makeSelect(props);
  }

  selectItem(value) {
    this.props.output({ target: { value: value.value, children: value.children, name: this.props.name}});
    this.setState({ chosen: value });
    this.toggleShown();
  }

  arrows(e) {
    e.preventDefault();
    let data = this.state.data;
    var i;
    if ( e.which === 38 ) {
      for (i = 0; i < data.length; i++) {
        if(data[i].selected) {
          data[i].selected = false;
          data[i - 1].selected = true;
          i = data.length;
        }
      }
      this.setState({ data });
    } else if ( e.which === 40 ) {
      for (i = 0; i < data.length; i++) {
        if(data[i].selected) {
          data[i].selected = false;
          data[i + 1].selected = true;
          i = data.length;
        }
      }
      this.setState({ data });
    } else if ( e.which === 13 ) {

      let item = this.state.data.find(item => {
        return item.selected === true;
      });

      this.selectItem(item);
    }
  }

  showList() {

    let items = this.state.data.map( (item, i) => {
      let chosen = item.selected;

      return <li
              autoFocus={chosen ? true : false}
              className={ chosen ? 'selected' : ''}
              key={i}
              tabIndex="-1"
              onClick={() => {this.selectItem(item)}}
              onKeyDown={this.arrows}
              value={item.value}>
                {item.children}
            </li>;
    })
    return items;
  }

  toggleShown(e) {
    this.setState({ shown: !this.state.shown });
  }

  render() {
    let list = this.showList();
    return (
      <div className={'ms-select ' + this.state.classes} id="Select" >
        <div className={'screen-cover ' + ( !this.state.shown ? 'gone' : '')} onClick={this.toggleShown}></div>
        <div tabIndex="0" className={'shown-box'} onFocus={this.toggleShown} onKeyDown={this.arrows}>
          <span className='view'>{this.state.chosen.children}</span>
          <i className={'fa fa-caret-up select-icon ' + (this.state.shown ? 'spun-back' : 'spun down')} aria-hidden="true"></i>
        </div>
        <ul className={'drop-list ' + (!this.state.shown ? 'gone' : '')}>
          {list}
        </ul>
      </div>
    );
  }
}

export default Select;
