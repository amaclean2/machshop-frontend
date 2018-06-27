import React, { Component } from 'react';

import MillToolEditor from '../Tools/MillToolEditor';
import LatheToolEditor from '../Tools/LatheToolEditor';
import OtherToolEditor from '../Tools/OtherToolEditor';
import DeleteModal from '../../Main/DeleteModal';
import * as fluxActions from '../../../Flux/actions';
import fluxStore from '../../../Flux/fluxStore';

class OrderEditorModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {tool_data: {}},
      viewerMode: 'Endmill',
			toolId: this.props.id,
      machine: this.props.machine,
      loaded: false,
      modalHide: true,
      redirect: false,
      readyToBuy: false
		}
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
    this.cancelPurchase=this.cancelPurchase.bind(this);
	}

  confirmPurchase() {
    this.setState({readyToBuy: true});
  }

  cancelPurchase() {
    this.setState({ readyToBuy: false});
  }

  buyTool() {

    let toolData = this.state.data.tool_data;
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
        tool_data: toolData,
        created_at: this.state.data.created_at
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.props.triggerUpdate();
      this.props.toggleModal('0');
      this.props.toggleBig({target: {id: 'purchased'}});
    });
  }

  delete() {

    fluxActions.deleteOrder(this.props.id, this.props.machine);
  }

  componentWillMount() {
    fluxStore.on('change', () => {
      this.toggleDeleteModal();
      this.props.toggleModal('0');
    })
  }

	get() {

    this.setState({ data: fluxStore.getForm(this.props.machine, this.props.id), loaded: true });

  }

  output(value, name) {
    let toolData = this.state.data.tool_data;
    toolData[name] = value;
    this.setViewerMode();
  }

  post() {

    let toolData = this.state.data.tool_data;
    toolData.shopping = true;
    toolData.purchased = false;

    let body = {
        user: 'Andrew',
        tool_data: toolData
      }, machine = this.state.machine;


    fluxActions.addOrder( body , machine );

  }

  put() {

    let toolData = this.state.data.tool_data;
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
        tool_data: toolData,
        created_at: this.state.data.created_at
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
    if(this.state.data.tool_data['tool_type']) {
      switch(this.state.data.tool_data['tool_type']) {
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
                viewerMode={this.state.viewerMode}
                toolData={this.state.data} 
                toolId={this.state.toolId} 
                readyToBuy={this.state.readyToBuy}
                cancel={this.cancelPurchase}
                save={this.save}
                order={true}
                buyTool={this.buyTool}
                output={this.output} />
      else if(this.state.machine === 'lathe')
        return <LatheToolEditor  
                readyToBuy={this.state.readyToBuy}
                toolData={this.state.data} 
                viewerMode={this.state.viewerMode}
                cancel={this.cancelPurchase}
                toolId={this.state.toolId} 
                save={this.save} 
                order={true}
                buyTool={this.buyTool}
                output={this.output} />
      else if(this.state.machine === 'other')
        return <OtherToolEditor 
                readyToBuy={this.state.readyToBuy}
                toolData={this.state.data}
                viewerMode={this.state.viewerMode} 
                cancel={this.cancelPurchase}
                toolId={this.state.toolId} 
                save={this.save} 
                order={true}
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
    	<div id="OrderEditorModal">
        <div className="sidenav-background"></div>
        <div className="modal-container">
          <div className="modal-content editor">
            <div className="modal-top">
              <h3>Tool Editor</h3>
              <div className={(this.state.modalHide ? 'gone' : '')} >
                <DeleteModal delete={this.delete} reject={ this.toggleDeleteModal } />
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
                <a onClick={() => { this.props.toggleModal('0'); }} className={'button table-button close-modal-button close-button ' + (this.state.readyToBuy ? 'gone' : '')}>
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
