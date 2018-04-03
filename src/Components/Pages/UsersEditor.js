import React, { Component } from 'react';

import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
import { NavLink, Redirect } from 'react-router-dom';
import DeleteModal from '../Main/DeleteModal';

class UsersEditor extends Component {
constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userId: this.props.id,
      editable: false,
      newUser: false,
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
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/users/' + this.state.userId + '?company_id=' + id, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ userInfo: data, loaded: true });
    })
  }

  post() {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
      	request = new Request(url + '/companies', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        name: this.state.userInfo.name,
        company_name: this.state.userInfo.company_name,
		    company_id: this.state.userInfo.company_id,
		    user_position: this.state.userInfo.user_position,
		    email: this.state.userInfo.email,
		    street_address: this.state.userInfo.street_address,
		    city: this.state.userInfo.city,
		    state: this.state.userInfo.state,
		    country: this.state.userInfo.country,
		    phone_number: this.state.userInfo.phone_number
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ userId: data._id });
    });
  }

  put() {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/users/' + this.state.userId, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: this.state.userInfo.name,
        company_name: this.state.userInfo.company_name,
		    company_id: this.state.userInfo.company_id,
		    user_position: this.state.userInfo.user_position,
		    email: this.state.userInfo.email,
		    street_address: this.state.userInfo.street_address,
		    city: this.state.userInfo.city,
		    state: this.state.userInfo.state,
		    country: this.state.userInfo.country,
		    phone_number: this.state.userInfo.phone_number
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
        request = new Request(url + '/users/' + this.state.userId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ redirect: true });
    });
  }

  change(e) {
    let newInfo = this.state.userInfo;
    newInfo[e.target.name] = e.target.value;
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  toggleModal() {
    this.setState({ modalHide: !this.state.modalHide });
  }

  save() {

    if( this.state.newUser ) {
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
	      return (
	        <div onClick={ this.toggleEdit }>
	        	<DescriptionItem header={'Name: '} value={this.state.userInfo.name} />
				    <DescriptionItem header={'User Position: '} value={this.state.userInfo.user_position} />
				    <DescriptionItem header={'Street Address: '} value={this.state.userInfo.street_address} />
				    <DescriptionItem header={'City: '} value={this.state.userInfo.city} />
				    <DescriptionItem header={'State: '} value={this.state.userInfo.state} />
				    <DescriptionItem header={'Country: '} value={this.state.userInfo.country} />
				    <DescriptionItem header={'Phone Number: '} value={this.state.userInfo.phone_number} />
            <DescriptionItem header={'Email: '} value={this.state.userInfo.email} />
            <DescriptionItem header={'Company Name: '} value={this.state.userInfo.company_name} />
            <DescriptionItem header={'Company Id: '} value={this.state.userInfo.company_id} />
	        </div>);
	    } else {
	      return (
	        <div>
	        	<EditableItem header={'Name: '} value={this.state.userInfo.name} change={this.change} name={'name'} type='textOnly' />
						<EditableItem header={'User Position: '} value={this.state.userInfo.user_position} change={this.change} name={'user_position'} type='textOnly' />
						<EditableItem header={'Street Address: '} value={this.state.userInfo.street_address} change={this.change} name={'street_address'} />
						<EditableItem header={'City: '} value={this.state.userInfo.city} change={this.change} name={'city'} type='textOnly'/>
						<EditableItem header={'State: '} value={this.state.userInfo.state} change={this.change} name={'state'} type='textOnly'/>
						<EditableItem header={'Country: '} value={this.state.userInfo.country} change={this.change} name={'country'} type='textOnly'/>
						<EditableItem header={'Phone Number: '} value={this.state.userInfo.phone_number} change={this.change} name={'phone_number'} type='phone' />
            <DescriptionItem header={'Email: '} value={this.state.userInfo.email} />
            <DescriptionItem header={'Company Name: '} value={this.state.userInfo.company_name} />
            <DescriptionItem header={'Company Id: '} value={this.state.userInfo.company_id} />
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
    if (this.state.userId !== '0') {
      this.get();
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    let info = this.viewInfo();

    return (
      <div>
        <div className='sidenav-background'>
          <div className='modal-container'>
            <div className='modal-content editor'>
              <div className='modal-top'>
                <h3>User Profile</h3>
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
                    <span className='close-big'>Return to Users</span>
                  </a>
                </div>
              </div>
              {info}
            </div>
          </div>
        </div>
        {/*<button className='button'> Clock In</button>*/}
      </div>
    );
  }
}

export default UsersEditor;
