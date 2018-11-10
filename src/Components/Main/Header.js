import React, { Component } from 'react';
import fluxStore from '../../Flux/fluxStore';
import SideNav from './SideNav';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor() {
  	super()
  	this.state = {
  		hidden: true,
  		gone: true,
      data: [
        { value: 'default', children: 'Select User'},
        { value: 'andrew_maclean', children: 'Andrew Maclean'},
      ],
      title: ''
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

  componentWillMount() {

    fluxStore.on('millUpdated', () => {
      let userInfo = fluxStore.getUserInfo();
      this.setState({ title: userInfo.company_name });
    });
  }

  showFullHeader() {
    return <div>
      <div className="header-wrapper">
        <h2>{this.props.title}</h2>
        <div className="flex-spacer"></div>
        <NavLink className="company-title" to={'/companies'}>{this.state.title}</NavLink>
        <div className="right-content">
          <i className="fa fa-bars hoverable" aria-hidden="true" onClick={this.toggleHideSideNav} ></i>
        </div>
      </div>

      <SideNav hidden={this.state.hidden} gone={this.state.gone} toggleHideSideNav={this.toggleHideSideNav} tabs={this.props.tabs} logout={this.props.logout} />
    </div>;
  }

  render() {
    let header = this.showFullHeader();
    return (
      <div>
	     {header}
      </div>
    );
  }
}

export default Header;
