import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SideNav extends Component {

	contentList() {
		let tabs = this.props.tabs.map( (item, i) => {
			return (<li key={i}>
               <NavLink to={'/' + item.value} onClick={this.props.toggleHideSideNav}>{item.name}</NavLink>
             </li>);
		})

		return tabs;
	}

  render() {
  	let tabs = this.contentList();
    return (
      <div id='Main/SideNav'>
      	<div
          className={'sidenav-background ' + (this.props.gone ? 'gone ' : '') + (this.props.hidden ? 'fade-out ' : 'fade-in ')}
          onClick={this.props.toggleHideSideNav} >
        </div>
      	<div className={'sidenav-view ' + (this.props.hidden ? 'hide ' : '')} >
      		<div className={'sidenav-header'} >
            <button className='button white-button' onClick={this.props.logout} >Logout</button>
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
