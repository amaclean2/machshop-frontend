import React, { Component } from 'react';
import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
import { NavLink } from 'react-router-dom';
import DeleteModal from '../Main/DeleteModal';

class CompanyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: this.props.match.params.companyId ? this.props.match.params.companyId : '0',
      companyInfo: {},
      editable: false,
      newCompany: false,
      modalHide: true,
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
      console.log('company loaded');
      console.log(data);
      this.setState({ companyInfo: data });
    })
  }

  post(
    name,
    street_address,
    city,
    state,
    country,
    email,
    phone_number) {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
      	request = new Request(url + '/companies', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        name: name,
        street_address: street_address,
        city: city,
        state: state,
        country: country,
        email: email,
        phone_number: phone_number
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ companyId: data._id });
    });
  }

  put(
    name,
    street_address,
    city,
    state,
    country,
    email,
    phone_number) {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/companies/' + this.state.companyId, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: name,
        street_address: street_address,
        city: city,
        state: state,
        country: country,
        email: email,
        phone_number: phone_number
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  delete(companyId) {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/companies/' + companyId, {
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
    	this.post(this.state.companyInfo.name,
                this.state.companyInfo.street_address,
                this.state.companyInfo.city,
                this.state.companyInfo.state,
                this.state.companyInfo.country,
                this.state.companyInfo.email,
                this.state.companyInfo.phone_number);
    } else {
      this.put(this.state.companyInfo.name,
                this.state.companyInfo.street_address,
                this.state.companyInfo.city,
                this.state.companyInfo.state,
                this.state.companyInfo.country,
                this.state.companyInfo.email,
                this.state.companyInfo.phone_number);
    }
    this.toggleEdit();

  }

  viewInfo() {
    let info;
    if (!this.state.editable) {
      info = (
        <div onClick={ this.toggleEdit }>
        	<DescriptionItem header={'Company Id: '} value={this.state.companyId} />
          <DescriptionItem header={'Company Name: '} value={this.state.companyInfo.name} />
          <DescriptionItem header= {'Street Addresss: '} value={this.state.companyInfo.street_address} />
          <DescriptionItem header={'City: '} value={this.state.companyInfo.city}/>
          <DescriptionItem header={'State: '} value={this.state.companyInfo.state}/>
          <DescriptionItem header={'Country: '} value={this.state.companyInfo.country} />
          <DescriptionItem header={'Email: '} value={this.state.companyInfo.email} />
          <DescriptionItem header={'Phone Number: '} value={this.state.companyInfo.phone_number} />
        </div>
      )
    } else {
      info = (
        <div>
          <EditableItem header={'Company Name: '} value={this.state.companyInfo.name} change={this.change} name={'name'} />
          <EditableItem header={'Street Address: '} value={this.state.companyInfo.street_address} change={this.change} name={'street_address'} />
          <EditableItem header={'City: '} value={this.state.companyInfo.city} change={this.change} name={'city'} />
          <EditableItem header={'State: '} value={this.state.companyInfo.state} change={this.change} name={'state'} />
          <EditableItem header={'Country: '} value={this.state.companyInfo.country} change={this.change} name={'country'} />
          <EditableItem header={'Email: '} value={this.state.companyInfo.email} change={this.change} name={'email'} />
          <EditableItem header={'Phone Number: '} value={this.state.companyInfo.phone_number} change={this.change} name={'phone_number'} />
          <button onClick={ this.save } className='button save-button'>Save</button>
        </div>
      )
    }
    return (
      <div className={'card left-column ' + (this.state.editable ? 'no-fade' : '')} >
        {info}
      </div>
    )
  }

  componentWillMount() {
    if (this.state.companyId !== '0') {
      this.get();
    } else {
      this.setState({ editable: true, newCompany: true });
    }
  }

  render() {
    let info = this.viewInfo();
    return (
      <div>
        <h3>Company Editor</h3>
        <div className={(this.state.modalHide ? 'gone' : '')} >
          <DeleteModal delete={() => {this.delete(this.state.companyId)}} reject={this.toggleModal} link={'/companies'} />
        </div>
        <NavLink to={'/companies'} className='button table-button'>Return to Companies</NavLink>
        <button
          className='button table-button delete-button'
          onClick={this.toggleModal}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div className='edit-page'>
          {info}
        </div>
      </div>
    );
  }
}

export default CompanyEditor;
