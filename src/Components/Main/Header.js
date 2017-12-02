import React, { Component } from 'react';
import SideNav from './SideNav';

class Header extends Component {
  constructor() {
  	super()
  	this.state = {
  		hidden: true,
  		gone: true
  	}
  	this.toggleHideSideNav=this.toggleHideSideNav.bind(this);
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
	      <h2>MachShop</h2>

	   	  <div className="right-content">
	      	<select>
	      		<option>Users</option>
	      		<option>Andrew Maclean</option>
	      	</select>
	      	<button className="button white-button header-select-btn">Select</button>
	      	<i className="fa fa-bell-o hoverable" aria-hidden="true"></i>
	      	<i className="fa fa-bars hoverable" aria-hidden="true" onClick={this.toggleHideSideNav} ></i>
	      </div>
	    </div>

	    <SideNav hidden={this.state.hidden} gone={this.state.gone} toggleHideSideNav={this.toggleHideSideNav} tabs={this.props.tabs} />
      </div>
    );
  }
}

export default Header;
