import React, { Component } from 'react';

import MillToolEditor from '../Tools/MillToolEditor';
import LatheToolEditor from '../Tools/LatheToolEditor';
import OtherToolEditor from '../Tools/OtherToolEditor';
import DeleteModal from '../../Main/DeleteModal';

class OrderEditorModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toolData: {},
      viewerMode: 'Endmill',
			toolId: this.props.id,
      machine: this.props.machine,
      loaded: false,
      modalHide: true,
      redirect: false,
      readyToBuy: false
		}
    this.change=this.change.bind(this);
    this.delete=this.delete.bind(this);
    this.get=this.get.bind(this);
    this.output=this.output.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.save=this.save.bind(this);
    this.setViewerMode=this.setViewerMode.bind(this);
    this.stationSelector=this.stationSelector.bind(this);
    this.toggleDeleteModal=this.toggleDeleteModal.bind(this);
    this.buyTool=this.buyTool.bind(this);
    this.confirmPurchase=this.confirmPurchase.bind(this);
	}

  confirmPurchase() {
    this.setState({readyToBuy: true});
  }

  change(e) {
    let toolData = this.state.toolData;
    toolData[e.target.name] = e.target.value;
    if(e.target.name === 'diameter' ) {
      toolData.undercut_width = e.target.value;
    }
  }

  buyTool() {
    let toolData = this.state.toolData;
    toolData.shopping = false;
    toolData.purchased = true;

    let url = sessionStorage.getItem('user').split(',')[2],
        machine = this.state.machine,
        request = new Request(url + '/shopping/' + machine + '/' + this.state.toolId , {
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: 'Andrew',
        company_id: sessionStorage.getItem('user').split(',')[1],
        tool_data: toolData
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.props.triggerUpdate();
      this.props.toggleModal('0');
    });
  }

  delete() {
    let url = sessionStorage.getItem('user').split(',')[2],
        machine = this.state.machine,
        request = new Request(url + '/shopping/' + machine + '/' + this.state.toolId, {
      method: 'DELETE'
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.props.triggerUpdate('refresh');
    });
  }

	get() {

    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/shopping/' + this.state.machine + '/' + this.state.toolId + '?company_id=' + id, {
      method: 'GET'
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ toolData: data.tool_data, loaded: true});
    })

  }

  output(value, name) {
    let toolData = this.state.toolData;
    toolData[name] = value;
    this.setViewerMode();
  }

  post() {

    let toolData = this.state.toolData;
    toolData.shopping = true;
    toolData.purchased = false;

    let url = sessionStorage.getItem('user').split(',')[2],
        machine = this.state.machine,
        request = new Request(url + '/shopping/' + machine, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: 'Andrew',
        company_id: sessionStorage.getItem('user').split(',')[1],
        tool_data: toolData
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ toolId: data._id });
      this.props.triggerUpdate();
    });

  }

  put() {

    let toolData = this.state.toolData;
    toolData.shopping = true;
    toolData.purchased = false;

    let url = sessionStorage.getItem('user').split(',')[2],
        machine = this.state.machine,
        request = new Request(url + '/shopping/' + machine + '/' + this.state.toolId , {
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: 'Andrew',
        company_id: sessionStorage.getItem('user').split(',')[1],
        tool_data: toolData
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.props.triggerUpdate();
    });
  }

  save() {
    if(this.state.toolId === '0') {
      this.post();
    } else {
      this.put();
    }
  }

  setViewerMode() {
    if(this.state.toolData['tool_type']) {
      switch(this.state.toolData['tool_type']) {
        case 'Endmill' :
          this.setState({ viewerMode: 'Endmill' });
          break;
        case 'Drill' :
          this.setState({ viewerMode: 'Drill' });
          break;
        case 'Spot Drill' :
          this.setState({ viewerMode: 'Drill' });
          break;
        case 'Center Drill' :
          this.setState({ viewerMode: 'Drill' });
          break;
        default :
          this.setState({ viewerMode: '' });
          break;
      }
    }
  }

  stationSelector() {
    if(this.state.loaded) {
      if(this.state.machine === 'mill')
        return <MillToolEditor 
                count={this.state.count} 
                viewerMode={this.state.viewerMode}
                toolData={this.state.toolData} 
                toolId={this.state.toolId} 
                readyToBuy={this.state.readyToBuy}
                save={this.save}
                order={true}
                change={this.change} 
                buyTool={this.buyTool}
                output={this.output} />
      else if(this.state.machine === 'lathe')
        return <LatheToolEditor 
                count={this.state.count} 
                readyToBuy={this.state.readyToBuy}
                toolData={this.state.toolData} 
                viewerMode={this.state.viewerMode}
                toolId={this.state.toolId} 
                save={this.save} 
                order={true}
                change={this.change}
                buyTool={this.buyTool}
                output={this.output} />
      else if(this.state.machine === 'other')
        return <OtherToolEditor 
                count={this.state.count} 
                readyToBuy={this.state.readyToBuy}
                toolData={this.state.toolData}
                viewerMode={this.state.viewerMode} 
                toolId={this.state.toolId} 
                save={this.save} 
                order={true}
                change={this.change}
                buyTool={this.buyTool}
                output={this.output} />
    }
  }

  toggleDeleteModal() {
    this.setState({ modalHide: !this.state.modalHide });
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
                  className={'button table-button delete-button ' + (this.state.toolId === '0' || this.state.readyToBuy ? 'gone' : '')}
                  onClick={this.toggleDeleteModal} >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button
                  className={'button table-button close-modal-button ' + (this.state.toolId === '0' || this.state.readyToBuy ? 'gone' : '')}
                  onClick={this.confirmPurchase /*this.buyTool*/}>
                  purchase
                </button>
                <a onClick={() => { this.props.toggleModal('0'); }} className='button table-button close-modal-button close-button'>
                  <span className='close-small'><i className="fa fa-times close-x"></i></span>
                  <span className='close-big'>Return to Shopping List</span>
                </a>
              </div>
            </div>
            <div className={'purchase-command fade-in ' + (this.state.readyToBuy ? '' : 'gone')}>Double check your order</div>
            {station}
          </div>
        </div>
      </div>
    );
  }
}

export default OrderEditorModal;
