import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import DescriptionItem from '../../Main/DescriptionItem';

class MillToolEditor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toolData: [],
			toolId: this.props.match.params.toolId,
			mill: this.props.match.url.indexOf('mill') !== -1,
			lathe: this.props.match.url.indexOf('lathe') !== -1,
			other: this.props.match.url.indexOf('other') !== -1,
			editable: false
		}
		this.get=this.get.bind(this);
		this.toggleEdit=this.toggleEdit.bind(this);
	}

	toggleEdit() {
		this.setState({ edit: !this.state.edit });
	}

	get() {
    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '//' + this.state.jobId + '?company_id=' + id, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ jobInfo: data, operationCount: data.operations.length });
    })
  }

  viewInfo() {
  	let info;
  	if(!this.state.editable) {
  		info = (<div onClick={this.toggleEdit}>
  			<DescriptionItem header={'Tool Type: '} value={this.state.toolData.tool_type} />
        <DescriptionItem header={'Diameter: '} value={this.state.toolData.diameter} />
        <DescriptionItem header={'Material: '} value={this.state.toolData.material} />
        <DescriptionItem header={'Flutes: '} value={this.state.toolData.flutes} />
        <DescriptionItem header={'Flute Length: '} value={this.state.toolData.flute_length} />
        <DescriptionItem header={'Corner Radius: '} value={this.state.toolData.corner_radius} />
        <DescriptionItem header={'Tool Length: '} value={this.state.toolData.tool_length} />
        <DescriptionItem header={'Undercut Width: '} value={this.state.toolData.undercut_width} />
        <DescriptionItem header={'Undercut Length: '} value={this.state.toolData.undercut_length} />
  		</div>)
  	} else {
  		info = (<div>
        <span className='submit-button-line'><button onClick={ this.save } className='button save-button small-button'>Save</button></span>
      </div>)
  	}

  	return (<div className={'card left-column ' + (this.state.editable ? 'no-fade' : '')} >
  			{info}
  		</div>);
  }

	componentDidMount() {
	}

  render() {
  	let info = this.viewInfo();
    return (
    	<div>
        <h3>Tool Editor</h3>
        <NavLink to={'/machining'} className='button table-button'>Return to Machining</NavLink>
        <button
          className='button table-button delete-button'>
          {/*onClick={this.toggleModal}>*/}
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div className='edit-page'>
        	{info}
        	<div className='work-flow card no-fade'>
          </div>
        </div>
      </div>
    );
  }
}

export default MillToolEditor;
