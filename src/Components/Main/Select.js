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
    if(this.props.children && this.props.children.props.className) {
      let classes = this.state.classes;
      classes += this.props.children.props.className + ' ';
      this.setState({ classes });
    }
    if(this.props.classes) {
      let classes = this.state.classes;
      classes += this.props.classes + ' ';
      this.setState({ classes });
    }
  }

  makeSelect() {
    let data;
    if(this.props.data) {
      data = this.props.data;
    } else {
      data = this.props.children.props.children.map( child => {
        return child.props;
      });
    }
    this.setState({ data, chosen: (this.props.value ? { value: this.props.value, children: this.props.value } : data[0]) });
  }

  componentDidMount() {
    this.getClasses();
    this.makeSelect();
  }

  selectItem(value) {
    this.props.output({ target: { value: value.value, name: this.props.name}});
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
