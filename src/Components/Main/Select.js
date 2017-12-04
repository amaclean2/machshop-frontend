import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: this.props.children.props.children[0].props.children,
      shown: false
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.toggleShown=this.toggleShown.bind(this);
    this.selectItem=this.selectItem.bind(this);
  }

  makeSelect() {
    let list = this.props.children.props.children.map( (child, i) => {
      return <li key={i} rel={child.props.value} onClick={() => {this.selectItem(child.props.children)}}>{child.props.children}</li>;
    });
    return list;
  }

  selectItem(selected) {
    this.setState({ view: selected });
    this.toggleShown();
  }

  toggleShown() {
    this.setState({ shown: !this.state.shown });
  }

  render() {
    let list = this.makeSelect();
    return (
      <div className='ms-select'>
        <div className={'screen-cover ' + ( !this.state.shown ? 'gone' : '')} onClick={() => this.toggleShown()}></div>
        <div className='shown-box' onClick={this.toggleShown} >
          {this.state.view}
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
