import React, { Component } from 'react';

import MillToolEditor from '../Tools/MillToolEditor';
import LatheToolEditor from '../Tools/LatheToolEditor';
import OtherToolEditor from '../Tools/OtherToolEditor';
import DeleteModal from '../../Main/DeleteModal';

import * as fluxActions from '../../../Flux/actions';
import fluxStore from '../../../Flux/fluxStore';

class PurchasedEditorModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {toolData: {}},
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
    this.put=this.put.bind(this);
    this.save=this.save.bind(this);
    this.setViewerMode=this.setViewerMode.bind(this);
    this.stationSelector=this.stationSelector.bind(this);
    this.toggleDeleteModal=this.toggleDeleteModal.bind(this);
    this.receiveTool=this.receiveTool.bind(this);
    this.confirmPurchase=this.confirmPurchase.bind(this);
    this.cancelPurchase=this.cancelPurchase.bind(this);
	}

  confirmPurchase() {
    this.setState({readyToBuy: true});
  }

  cancelPurchase() {
    this.setState({ readyToBuy: false});
  }

  get() {
    this.setState({ data: fluxStore.getForm('ordering', this.props.id, this.props.machine), loaded: true });
  }

  receiveTool() {

    let toolData = fluxStore.viewForm();
    toolData.shopping = false;
    toolData.purchased = false;

    let body = {
      tool_data: toolData,

    }, machine = this.state.machine;

    fluxActions.editOrder( body, machine );

    this.props.toggleModal();
    this.props.toggleBig({ target: { id: 'shipped' }});
  }

  componentWillMount() {
    fluxActions.resetForm();
  }

  delete() {

    fluxActions.deleteOrder(this.props.id, this.props.machine);
    this.toggleDeleteModal();
    this.props.toggleModal();
  }

  put() {

    let toolData = fluxStore.viewForm();
    toolData.shopping = false;
    toolData.purchased = true;

    let body = {
      tool_data: toolData,

    }, machine = this.state.machine;

    fluxActions.editOrder( body, machine );
  }

  save() {
    this.put();
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
                readyToBuy={this.state.readyToBuy}
                count={this.state.count} 
                viewerMode={this.state.viewerMode}
                toolData={this.state.data} 
                toolId={this.state.toolId} 
                save={this.save}
                order={true}
                buyTool={this.receiveTool}
                cancel={this.cancelPurchase}/>
      else if(this.state.machine === 'lathe')
        return <LatheToolEditor 
                readyToBuy={this.state.readyToBuy}
                count={this.state.count} 
                toolData={this.state.data} 
                viewerMode={this.state.viewerMode}
                toolId={this.state.toolId} 
                save={this.save}
                order={true}
                buyTool={this.receiveTool}
                cancel={this.cancelPurchase}/>
      else if(this.state.machine === 'other')
        return <OtherToolEditor 
                readyToBuy={this.state.readyToBuy}
                count={this.state.count} 
                toolData={this.state.data}
                viewerMode={this.state.viewerMode} 
                toolId={this.state.toolId} 
                save={this.save}
                order={true}
                buyTool={this.receiveTool}
                cancel={this.cancelPurchase} />
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
        <div className="sidenav-background" onClick={this.props.toggleModal}></div>
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
                  onClick={this.confirmPurchase} >
                  receive
                </button>
                <a onClick={() => { this.props.toggleModal('0'); }} className={'button table-button close-modal-button close-button ' + (this.state.readyToBuy ? 'gone' : '')}>
                  <span className='close-small'><i className="fa fa-times close-x"></i></span>
                  <span className='close-big'>Return to Purchased List</span>
                </a>
              </div>
            </div>
            <div className={'purchase-command fade-in ' + (this.state.readyToBuy ? '' : 'gone')}>Check what you're receiving</div>
            {station}
          </div>
        </div>
      </div>
    );
  }
}

export default PurchasedEditorModal;
