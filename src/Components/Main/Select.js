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

  showList() {
    let items = this.state.data.map( (item, i) => {
      return <li key={i} onClick={() => {this.selectItem(item)}} value={item.value}>{item.children}</li>;
    })
    return items;
  }

  toggleShown() {
    this.setState({ shown: !this.state.shown });
  }

  render() {
    let list = this.showList();
    return (
      <div className={'ms-select ' + this.state.classes} id="Select" >
        <div className={'screen-cover ' + ( !this.state.shown ? 'gone' : '')} onClick={this.toggleShown}></div>
        <div className={'shown-box'} onClick={this.toggleShown}>
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
