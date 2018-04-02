import React, { Component } from 'react';

import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
import { NavLink, Redirect } from 'react-router-dom';
import DeleteModal from '../Main/DeleteModal';

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
    this.delete=this.delete.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.change=this.change.bind(this);
    this.save=this.save.bind(this);
    this.toggleModal=this.toggleModal.bind(this);

  }

  get() {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/companies/' + this.state.companyId, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ companyInfo: data, loaded: true });
    })
  }

  post() {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/companies', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        name: this.state.companyInfo.name,
        street_address: this.state.companyInfo.street_address,
        city: this.state.companyInfo.city,
        state: this.state.companyInfo.state,
        country: this.state.companyInfo.country,
        email: this.state.companyInfo.email,
        phone_number: this.state.companyInfo.phone_number
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ companyId: data._id });
    });
  }

  put() {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/companies/' + this.state.companyId, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: this.state.companyInfo.name,
        street_address: this.state.companyInfo.street_address,
        city: this.state.companyInfo.city,
        state: this.state.companyInfo.state,
        country: this.state.companyInfo.country,
        email: this.state.companyInfo.email,
        phone_number: this.state.companyInfo.phone_number
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  delete() {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/companies/' + this.state.companyId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  change(e) {
    let newInfo = this.state.companyInfo;
    newInfo[e.target.name] = e.target.value;
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  toggleModal() {
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
    let info;
    if(this.state.loaded) {
      if (!this.state.editable) {
        return (<div onClick={ this.toggleEdit }>
          <DescriptionItem header={'Company Id: '} value={this.state.companyId} />
          <DescriptionItem header={'Company Name: '} value={this.state.companyInfo.name} />
          <DescriptionItem header= {'Street Addresss: '} value={this.state.companyInfo.street_address} />
          <DescriptionItem header={'City: '} value={this.state.companyInfo.city}/>
          <DescriptionItem header={'State: '} value={this.state.companyInfo.state}/>
          <DescriptionItem header={'Country: '} value={this.state.companyInfo.country} />
          <DescriptionItem header={'Email: '} value={this.state.companyInfo.email} />
          <DescriptionItem header={'Phone Number: '} value={this.state.companyInfo.phone_number} />
        </div>);
      } else {
        return (<div>
          <EditableItem header={'Company Name: '} value={this.state.companyInfo.name} change={this.change} name={'name'} />
          <EditableItem header={'Street Address: '} value={this.state.companyInfo.street_address} change={this.change} name={'street_address'} />
          <EditableItem header={'City: '} value={this.state.companyInfo.city} change={this.change} name={'city'} />
          <EditableItem header={'State: '} value={this.state.companyInfo.state} change={this.change} name={'state'} />
          <EditableItem header={'Country: '} value={this.state.companyInfo.country} change={this.change} name={'country'} />
          <EditableItem header={'Email: '} value={this.state.companyInfo.email} change={this.change} name={'email'} />
          <EditableItem header={'Phone Number: '} value={this.state.companyInfo.phone_number} change={this.change} name={'phone_number'} />
          <span className='submit-button-line'>
            <button onClick={this.toggleEdit} className='button small-button white-button'>Cancel</button>
            <button onClick={this.save} className='button save-button small-button'>Save</button>
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

    return (<div>
      <div className='sidenav-background'>
        <div className='modal-container'>
          <div className='modal-content editor'>
            <div className='modal-top'>
              <h3>Company Editor</h3>
              <div className={(this.state.modalHide ? 'gone' : '')} >
                <DeleteModal delete={this.delete} reject={this.toggleModal} link={'#'} />
              </div>
              <div className='modal-corner-buttons'>
                <button
                  className='button table-button delete-button'
                  onClick={this.toggleModal}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <a onClick={() => { this.props.toggleModal('0'); }} className='button table-button close-button close-modal-button'>
                  <span className='close-small'><i className="fa fa-times close-x"></i></span>
                  <span className='close-big'>Return to Company</span>
                </a>
              </div>
            </div>
            {info}
          </div>
        </div>
      </div>
    </div>);
  }
}

export default CompanyEditor;
