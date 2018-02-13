import React, { Component } from 'react';

import { NavLink, Redirect } from 'react-router-dom';
import MillToolEditor from './MillToolEditor';
import LatheToolEditor from './LatheToolEditor';
import OtherToolEditor from './OtherToolEditor';
import DeleteModal from '../../Main/DeleteModal';

class ToolEditor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toolData: {},
      count: 1,
			toolId: this.props.match.params.toolId,
      machine: this.props.match.url.indexOf('mill') !== -1 ? 'mill' : this.props.match.url.indexOf('lathe') !== -1 ? 'lathe' : 'other',
      loaded: false,
      modalHide: true,
      redirect: false
		}
		this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
    this.save=this.save.bind(this);
    this.stationSelector=this.stationSelector.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.change=this.change.bind(this);
    this.changeCount=this.changeCount.bind(this);
    this.output=this.output.bind(this);
	}

	get() {

    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/' + this.state.machine + '/' + this.state.toolId + '?company_id=' + id, {
      method: 'GET'
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ toolData: data.tool_data, loaded: true});
    })

  }

  post() {

    for (var i = 0; i < this.state.count; i++) {

      let url = sessionStorage.getItem('user').split(',')[2],
          machine = this.state.machine,
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
        this.setState({ toolId: data._id });
      });
    }

  }

  put() {
    let url = sessionStorage.getItem('user').split(',')[2],
        machine = this.state.machine,
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
        machine = this.state.machine,
        request = new Request(url + '/' + machine + '/' + this.state.toolId, {
      method: 'DELETE'
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ redirect: true });
    });
  }

  toggleModal() {
    this.setState({ modalHide: !this.state.modalHide });
  }

  change(e) {
    let toolData = this.state.toolData;
    toolData[e.target.name] = e.target.value;
    if(e.target.name === 'diameter' ) {
      toolData.undercut_width = e.target.value;
    }
  }

  changeCount(e) {
    this.setState({ count: e.target.value });
  }

  output(value, name) {
    let toolData = this.state.toolData;
    toolData[name] = value;
  }

  stationSelector() {
    if(this.state.loaded) {
      if(this.state.machine === 'mill')
        return <MillToolEditor 
                count={this.state.count} 
                toolData={this.state.toolData} 
                toolId={this.state.toolId} 
                save={this.save} 
                change={this.change} 
                changeCount={this.changeCount}
                output={this.output} />
      else if(this.state.machine === 'lathe')
        return <LatheToolEditor 
                count={this.state.count} 
                toolData={this.state.toolData} 
                toolId={this.state.toolId} 
                save={this.save} 
                change={this.change}
                changeCount={this.changeCount} 
                output={this.output} />
      else if(this.state.machine === 'other')
        return <OtherToolEditor 
                count={this.state.count} 
                toolData={this.state.toolData} 
                toolId={this.state.toolId} 
                save={this.save} 
                change={this.change}
                changeCount={this.changeCount} 
                output={this.output} />
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
      this.setState({ count: 0 });
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    let station = this.stationSelector();

    if(this.state.redirect)
      return <Redirect to="/machining" />;

    return (
    	<div>
        <h3>Tool Editor</h3>
        <div className={(this.state.modalHide ? 'gone' : '')} >
          <DeleteModal delete={this.delete} reject={ this.toggleModal } link={'#'} />
        </div>
        <NavLink to={'/machining'} className='button table-button'>Return to Machining</NavLink>
        <button
          className='button table-button delete-button'
          onClick={this.toggleModal} >
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        {station}
      </div>
    );
  }
}

export default ToolEditor;
