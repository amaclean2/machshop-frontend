import React, { Component } from 'react';

import DeleteModal from '../../Main/DeleteModal';
import * as fluxActions from '../../../Flux/actions';
import fluxStore from '../../../Flux/fluxStore';
import MillSetupTemplate from './MillSetupTemplate';

class SetupEditorModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {},
			setupId: this.props.id,
      loaded: false,
      modalHide: true,
      redirect: false,
      station: 0,
      editView: false
		}
    this.delete=this.delete.bind(this);
    this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.save=this.save.bind(this);
    this.toggleDeleteModal=this.toggleDeleteModal.bind(this);
    this.editTemplate=this.editTemplate.bind(this);
	}

  delete() {

    fluxActions.deleteOrder(this.props.id, this.props.machine);
    this.toggleDeleteModal();
    this.props.toggleModal();
  }

  componentWillMount() {
    // fluxActions.resetForm();
  }

  toggleStation(e) {
    let station;
    switch(e.target.id) {
      case 'mill' :
        station = 0;
        break;
      case 'lathe' :
        station = 1;
        break;
      case 'other' :
        station = 2;
        break;
      default :
        break;
    }
    this.setState({ station: station });
  }

	get() {
    this.setState({ data: fluxStore.getForm('ordering', this.props.id, this.props.machine), loaded: true });
  }

  post() {

    let toolData = fluxStore.viewForm();
    toolData.shopping = true;
    toolData.purchased = false;

    let body = {
        user: 'Andrew',
        tool_data: toolData
      }, machine = this.state.machine;


    fluxActions.addOrder( body, machine );
    this.props.toggleModal();

  }

  put() {

    let toolData = fluxStore.viewForm();
    toolData.shopping = true;
    toolData.purchased = false;

    let body = {
      tool_data: toolData,

    }, machine = this.state.machine;

    fluxActions.editOrder( body, machine );
  }

  save() {
    if(this.state.toolId === '0') {
      this.post();
    } else {
      this.put();
    }
  }

  editTemplate(object) {
    let data = this.state.data;

    for ( let key in object ) {
      data[key] = object[key];
    };
  }

  toggleDeleteModal() {
    this.setState({ modalHide: !this.state.modalHide });
  }

  componentDidMount() {
    if(this.state.setupId !== '0') {
      this.get();
    } else {
      this.setState({ loaded: true, editView: true });
    }
  }

  render() {
    return (
    	<div id="Pages/SetupSheets/SetupEditorModal" className="setup-modal">
        <div className="sidenav-background" onClick={this.props.toggleModal}></div>
        <div className="modal-container">
          <div className="modal-content editor">
            <div className="modal-top">
              <div className={(this.state.modalHide ? 'gone' : '')} >
                <DeleteModal delete={this.delete} reject={ this.toggleDeleteModal } />
              </div>
              <div className='modal-corner-buttons'>
                <button
                  className={'button table-button delete-button ' + (this.state.setupId === '0' ? 'gone' : '')}
                  onClick={this.toggleDeleteModal} >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button onClick={() => { this.props.toggleModal('0'); }} className={'button table-button close-modal-button close-button '}>
                  <span className='close-small'><i className="fa fa-times close-x"></i></span>
                  <span className='close-big'>Return to Shopping List</span>
                </button>
              </div>
            </div>
            {/*<div className="toggle-pills">
              <input name="setupStation" id="mill" type="radio" onChange={this.toggleStation} checked={this.state.station === 0}/>
              <label htmlFor="mill">Mill</label>

              <input name="setupStation" id="lathe" type="radio" checked={this.state.station === 1} />
              <label htmlFor="lathe" >Lathe</label>

              <input name="setupStation" id="other" type="radio" checked={this.state.station === 2} />
              <label htmlFor="other" >Other</label>
            </div>*/}
            <MillSetupTemplate
              editTemplate={this.editTemplate}
              editView={this.state.editView}
              data={this.state.data}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SetupEditorModal;
