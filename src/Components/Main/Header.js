import React, { Component } from 'react';
// import fluxStore from '../../Flux/fluxStore';
import SideNav from './SideNav';
// import Select from './Select';

class Header extends Component {
  constructor() {
  	super()
  	this.state = {
  		hidden: true,
  		gone: true,
      data: [
        { value: 'default', children: 'Select User'},
        { value: 'andrew_maclean', children: 'Andrew Maclean'}
      ]
  	}
  	this.toggleHideSideNav=this.toggleHideSideNav.bind(this);
    this.selectOutput=this.selectOutput.bind(this);
  }

  selectOutput(value, name) {
    return [value, name];
  }

  toggleHideSideNav() {
  	this.setState({hidden: !this.state.hidden});
  	setTimeout(() => {
  		this.setState({gone: this.state.hidden});
  	}, 300);
  }

  render() {
    return (
      <div>
	    <div className="header-wrapper">
	      <h2>{this.props.title}</h2>
	   	  <div className="right-content">
          {/*fluxStore.getUserInfo()*/}
	      	<i className="fa fa-bars hoverable" aria-hidden="true" onClick={this.toggleHideSideNav} ></i>
	      </div>
	    </div>

	    <SideNav hidden={this.state.hidden} gone={this.state.gone} toggleHideSideNav={this.toggleHideSideNav} tabs={this.props.tabs} logout={this.props.logout} />
      </div>
    );
  }
}

export default Header;
