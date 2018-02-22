import React, { Component } from 'react';
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
	      <h2>MachShop</h2>
	   	  <div className="right-content">
          {sessionStorage.getItem('user').split(',')[3]}
	      	{/*<Select output={this.selectOutput} name={'userName'} >
            <select className = 'header-select'>
              <option value="default">Select User</option>
              <option value='Andrew_Maclean' selected>Andrew Maclean</option>
            </select>
          </Select>
	      	<button className="button white-button header-select-btn">Select</button>*/}
	      	{/*<i className="fa fa-bell-o hoverable" aria-hidden="true"></i>*/}
	      	<i className="fa fa-bars hoverable" aria-hidden="true" onClick={this.toggleHideSideNav} ></i>
	      </div>
	    </div>

	    <SideNav hidden={this.state.hidden} gone={this.state.gone} toggleHideSideNav={this.toggleHideSideNav} tabs={this.props.tabs} logout={this.props.logout} />
      </div>
    );
  }
}

export default Header;
