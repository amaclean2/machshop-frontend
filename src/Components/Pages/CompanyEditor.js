import React, { Component } from 'react';

import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
// import DeleteModal from '../Main/DeleteModal';
import States from '../AppInformation/States';

import * as fluxActions from '../../Flux/actions';
import fluxStore from '../../Flux/fluxStore';

class CompanyEditor extends Component {
constructor(props) {
    super(props);
    this.state = {
      companyInfo: {},
      companyId: this.props.id,
      editable: false,
      newCompany: false,
      modalHide: true,
      loaded: false,
      redirect: false
    }

    this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    // this.delete=this.delete.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.change=this.change.bind(this);
    this.save=this.save.bind(this);
    this.toggleDelete=this.toggleDelete.bind(this);

  }

  get() {

    this.setState({ companyInfo: fluxStore.getForm('companies', this.props.id), loaded: true });
  }

  post() {

    let body = fluxStore.viewForm();

    fluxActions.createCompany(body);
  }

  createStates() {
    return States.map( state => {
      return { value: state, children: state };
    });
  }

  put() {
    
    let body = fluxStore.viewForm();

    fluxActions.editCompany(body);
  }

  // delete() {
  //   let urlTemp = sessionStorage.getItem('user').split(',')[2],
  //       url = urlTemp.replace('http://localhost:3001', 'https://toolbbe.herokuapp.com'),
  //       request = new Request(url + '/companies/' + this.state.companyId, {
  //     method: 'DELETE',
  //     headers: new Headers({ 'Content-Type': 'application/json' })
  //   });

  //   fetch(request).then( response => {
  //     return response.json();
  //   }).then( data => {
  //     this.props.triggerUpdate('refresh');
  //   });
  // }

  change(e) {
    let newInfo = this.state.companyInfo;
    newInfo[e.target.name] = e.target.value;
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  toggleDelete() {
    this.setState({ modalHide: !this.state.modalHide });
  }

  save() {

    if( this.state.newCompany ) {
      this.post();
    } else {
      this.put();
    }
    this.toggleEdit();

  }

  viewInfo() {
    if(this.state.loaded) {
      if (!this.state.editable) {
        return (<div onClick={ this.toggleEdit } className='edit-page'>
          <DescriptionItem header={'Company Id: '} value={'_id'} />
          <DescriptionItem header={'Company Name: '} value={'name'} />
          <DescriptionItem header= {'Street Addresss: '} value={'street_address'} />
          <DescriptionItem header={'City: '} value={'city'}/>
          <DescriptionItem header={'State: '} value={'state'}/>
          {/*<DescriptionItem header={'Country: '} value={'country'} />*/}
          <DescriptionItem header={'Email: '} value={'email'} />
          <DescriptionItem header={'Phone Number: '} value={'phone_number'} />
        </div>);
      } else {
        return (<div className='edit-page'>
          <EditableItem header={'Company Name: '} name={'name'} />
          <EditableItem header={'Street Address: '} name={'street_address'} />
          <EditableItem header={'City: '} name={'city'} />
          <EditableItem header={'State: '} type={'select'} name={'state'} properties={this.createStates()} />
          {/*<EditableItem header={'Country: '} name={'country'} />*/}
          <EditableItem header={'Email: '} name={'email'} />
          <EditableItem header={'Phone Number: '} name={'phone_number'} type='phone' />
          <span className='submit-button-line'>
            <button onClick={this.toggleEdit} className='button white-button'>Cancel</button>
            <button onClick={this.save} className='button small-button'>Save</button>
          </span>
        </div>);
      }
    } else {
      return <span className='loading-screen'>Beaming all the satelites...</span>;
    }
      
  }

  componentWillMount() {
    if (this.state.companyId !== '0') {
      this.get();
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    let info = this.viewInfo();

    return (<div id="Pages/CompanyEditor">
      <div className='sidenav-background' onClick={this.props.toggleModal}></div>
      <div className='modal-container'>
        <div className='modal-content editor'>
          <div className='modal-top'>
            <h3>Company Editor</h3>
            <div className='modal-corner-buttons'>
              <button onClick={ this.props.toggleModal } className='button table-button close-button close-modal-button'>
                <span className='close-small'><i className="fa fa-times close-x"></i></span>
                <span className='close-big'>Return to Company</span>
              </button>
            </div>
          </div>
          <div className='edit-page'>
            {info}
          </div>
        </div>
      </div>
    </div>);
  }
}

export default CompanyEditor;
