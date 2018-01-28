import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import MillToolEditor from './MillToolEditor';
import LatheToolEditor from './LatheToolEditor';

class ToolEditor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toolData: {},
			toolId: this.props.match.params.toolId,
			mill: this.props.match.url.indexOf('mill') !== -1 ? 'mill' : null,
			lathe: this.props.match.url.indexOf('lathe') !== -1 ? 'lathe' : null,
			other: this.props.match.url.indexOf('other') !== -1 ? 'other' : null,
      loaded: false
		}
		this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
    this.save=this.save.bind(this);
    this.stationSelector=this.stationSelector.bind(this);
    this.change=this.change.bind(this);
    this.output=this.output.bind(this);
	}

	get() {

    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/' + (this.state.mill ? 'mill' : this.state.lathe ? 'lathe' : 'other') + '/' + this.state.toolId + '?company_id=' + id, {
      method: 'GET'
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ toolData: data.tool_data, loaded: true});
    })

  }

  post() {
    let url = sessionStorage.getItem('user').split(',')[2],
        machine = this.state.mill ? 'mill' : this.state.lathe ? 'lathe' : 'other',
        request = new Request(url + '/' + machine, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: 'Andrew',
        company_id: sessionStorage.getItem('user').split(',')[1],
        tool_data: this.state.toolData
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log(data);
      this.setState({ toolId: data._id });
    });
  }

  put() {
    let url = sessionStorage.getItem('user').split(',')[2],
        machine = this.state.mill ? 'mill' : this.state.lathe ? 'lathe' : 'other',
        request = new Request(url + '/' + machine + '/' + this.state.toolId , {
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: 'Andrew',
        company_id: sessionStorage.getItem('user').split(',')[1],
        tool_data: this.state.toolData
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  delete() {
    let url = sessionStorage.getItem('user').split(',')[2],
        machine = this.state.mill ? 'mill' : this.state.lathe ? 'lathe' : 'other',
        request = new Request(url + machine + this.state.toolId, {
      method: 'DELETE'
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  change(e) {
    let toolData = this.state.toolData;
    toolData[e.target.name] = e.target.value;
  }

  output(value, name) {
    let toolData = this.state.toolData;
    toolData[name] = value;
  }

  stationSelector() {
    if(this.state.loaded) {
      if(this.state.mill)
        return <MillToolEditor toolData={this.state.toolData} toolId={this.state.toolId} save={this.save} change={this.change} output={this.output} />
      else if(this.state.lathe)
        return <LatheToolEditor toolData={this.state.toolData} toolId={this.state.toolId} save={this.save} change={this.change} output={this.output} />
      else if(this.state.other)
        return 'other'; // <OtherToolEditor data={this.state.toolData} toolId={this.state.toolId} />
    }
  }

  save() {
    if(this.state.toolId === '0') {
      this.post();
    } else {
      this.put();
    }
  }

  componentDidMount() {
    if(this.state.toolId !== '0') {
      this.get();
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    let station = this.stationSelector();
    return (
    	<div>
        <h3>Tool Editor</h3>
        <NavLink to={'/machining'} className='button table-button'>Return to Machining</NavLink>
        <button
          className='button table-button delete-button'>
          {/*onClick={this.toggleModal}>*/}
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        {station}
      </div>
    );
  }
}

export default ToolEditor;
