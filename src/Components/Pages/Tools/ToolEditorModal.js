import React, { Component } from 'react';

import { NavLink, Redirect } from 'react-router-dom';
import MillToolEditor from './MillToolEditor';
import LatheToolEditor from './LatheToolEditor';
import OtherToolEditor from './OtherToolEditor';
import DeleteModal from '../../Main/DeleteModal';

class ToolEditorModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toolData: {},
      count: 1,
			toolId: this.props.id,
      machine: this.props.machine,
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
    this.toggleDeleteModal=this.toggleDeleteModal.bind(this);
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
        this.props.triggerUpdate();
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
      this.props.triggerUpdate();
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
      this.props.triggerUpdate('refresh');
    });
  }

  toggleDeleteModal() {
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

    return (
    	<div>
        <div className="sidenav-background"></div>
        <div className="modal-container">
          <div className="modal-content editor">
            <div className="modal-top">
              <h3>Tool Editor</h3>
              <div className={(this.state.modalHide ? 'gone' : '')} >
                <DeleteModal delete={this.delete} reject={ this.toggleDeleteModal } link={''} />
              </div>
              <div className='modal-corner-buttons'>
                <button
                  className='button table-button delete-button'
                  onClick={this.toggleDeleteModal} >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <a onClick={() => { this.props.toggleModal('0'); }} className='button table-button close-modal-button'>
                  <span className='close-small'><i className="fa fa-times close-x"></i></span>
                  <span className='close-big'>Return to Machining</span>
                </a>
              </div>
            </div>
            {station}
          </div>
        </div>
      </div>
    );
  }
}

export default ToolEditorModal;
