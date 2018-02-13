import React, { Component } from 'react';
import MillTools from './Tools/MillTools';
import LatheTools from './Tools/LatheTools';
import OtherTools from './Tools/OtherTools';

class Ordering extends Component {
	constructor() {
		super()
		this.state = {
			tools: 'mill'
		}
		this.toggle=this.toggle.bind(this);
	}

	toggle(i) {
		this.setState({ tools: (i) });
	}

	showTools() {
		switch(this.state.tools) {
			default :
				return <MillTools />
			case 'lathe' :
				return <LatheTools />
			case 'other' :
				return <OtherTools />
		}
	}

  render() {
  	let categories = this.showTools();
    return (
    	<div>
        <h3>Shopping List</h3>
        <div className='toggle toggle-smaller'>
        	<div onClick={() => {this.toggle('mill') }} className={(this.state.tools === 'mill' ? 'toggled' : '')}>
        		Mill Tools
        	</div>
        	<div onClick={() => {this.toggle('lathe') }} className={(this.state.tools === 'lathe' ? 'toggled' : '')}>
        		Lathe Tools
        	</div>
        	<div onClick={() => {this.toggle('other') }} className={(this.state.tools === 'other' ? 'toggled' : '')}>
        		Other
        	</div>
        </div>
        <div>
        	{categories}
        </div>
      </div>
    );
  }
}

export default Ordering;
