import React, { Component } from 'react';
import Tools from './Tools/Tools';
import SetupSheets from './SetupSheets';

class Machining extends Component {
	constructor() {
		super()
		this.state = {
			tools: true
		}
		this.toggle=this.toggle.bind(this);
	}

	toggle(i) {
		this.setState({ tools: (i) });
	}

	showTools() {
		if(this.state.tools) {
			return <Tools />
		} else {
			return <SetupSheets />
		}
	}

  render() {
  	let pages = this.showTools();
    return (
    	<div>
        <div className="flexible">
          <h3>Machining</h3>
      		{/*<div className='toggle'>
            <div onClick={() => {this.toggle(true) }} className={(this.state.tools ? 'toggled' : '')}>
              Tools
            </div>
            <div onClick={() => {this.toggle() }} className={(this.state.tools ? '' : 'toggled')}>
              Setup Sheets
            </div>
          </div>*/}
        </div>
    		<div>
    			{pages}
    		</div>
      </div>
    );
  }
}

export default Machining;
