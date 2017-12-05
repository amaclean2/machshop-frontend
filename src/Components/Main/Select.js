import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: [1, this.props.children.props.children[0].props.children],
      shown: false
    }
    this.makeSelect=this.makeSelect.bind(this);
    this.toggleShown=this.toggleShown.bind(this);
    this.selectItem=this.selectItem.bind(this);
  }

  makeSelect() {
    let elements = this.props.children.props.children;
    let list = elements.map( (child, i) => {
      if(child.props)
        return <li key={i} onClick={() => {this.selectItem(child.props.value, child.props.children)}}>{child.props.children}</li>;
      else
        return null;
    });
    if(elements[1].length) {
      elements[1].forEach( (element, i) => {
        list.push(<li key={i + 1 * 10} onClick={() => {this.selectItem(element.props.value, element.props.children)}}>{element}</li>);
      })
    }
    return list;
  }

  selectItem(value, selected) {
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
          {this.state.view[1]}
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
