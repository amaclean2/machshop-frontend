import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SideNav extends Component {

	contentList() {
		let tabs = this.props.tabs.map((item) => {
			let itemLower = item.toLowerCase();
			return (<li key={item}>
               <NavLink to={'/' + itemLower} onClick={this.props.toggleHideSideNav}>{item}</NavLink>
             </li>);
		})

		return tabs;
	}

  render() {
  	let tabs = this.contentList();
    return (
      <div>
      	<div
          className={'sidenav-background ' + (this.props.gone ? 'gone ' : '') + (this.props.hidden ? 'fade-out ' : 'fade-in ')}
          onClick={this.props.toggleHideSideNav} >
        </div>
      	<div className={'sidenav-view ' + (this.props.hidden ? 'hide ' : '')} >
      		<div className={'sidenav-header'} >
     	  	</div>
     	  	<div className={'sidenav-content'} >
     	  		<ul>
     	  			{tabs}
     	  		</ul>
     	  	</div>
      	</div>
      </div>
    );
  }
}

export default SideNav;
