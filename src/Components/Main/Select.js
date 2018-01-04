import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: [1, this.props.value ? this.props.value : this.props.children.props.children[0].props.children],
      shown: false
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.toggleShown=this.toggleShown.bind(this);
    this.selectItem=this.selectItem.bind(this);
  }

  makeSelect() {
    let elements = this.props.children.props.children;
    console.log(elements);
    let list = [];
    elements[1].forEach( (element, i) => {
      list.push(<li key={i + 1 * 10} onClick={() => {this.selectItem(element.props.value, element.props.children)}}>{element}</li>);
    })
    return list;
  }

  selectItem(value, selected) {
    this.props.output(value, this.props.name);
    this.setState({ view: [value, selected] });
    this.toggleShown();
  }

  toggleShown() {
    this.setState({ shown: !this.state.shown });
  }

  render() {
    let list = this.makeSelect();
    return (
      <div className={'ms-select ' + (this.props.children.props.className ? this.props.children.props.className : '')}>
        <div className={'screen-cover ' + ( !this.state.shown ? 'gone' : '')} onClick={this.toggleShown}></div>
        <div className='shown-box' onClick={this.toggleShown} >
          <span className="view">{this.state.view[1]}</span>
          <i className={'fa fa-caret-up select-icon ' + (this.state.shown ? 'spun-back' : 'spun down')} aria-hidden="true"></i>
        </div>
        <ul className={'drop-list ' + (!this.state.shown ? 'gone ' : '')}>
          {list}
        </ul>
      </div>
    );
  }
}

export default Select;
