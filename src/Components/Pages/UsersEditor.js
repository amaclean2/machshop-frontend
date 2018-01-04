import React, { Component } from 'react';

import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
import { NavLink } from 'react-router-dom';
import DeleteModal from '../Main/DeleteModal';

class UsersEditor extends Component {
constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userId: this.props.match.params.userId ? this.props.match.params.userId : '0',
      editable: false,
      newUser: false,
      modalHide: true,
      loaded: false
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
      console.log('user loaded');
      this.setState({ userInfo: data, loaded: true });
    })
  }

  post(
    name,
    company_name,
    company_id,
    user_position,
    email,
    street_address,
    city,
    state,
    country,
    phone_number) {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
      	request = new Request(url + '/companies', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        name: name,
        company_name: company_name,
		    company_id: company_id,
		    user_position: user_position,
		    email: email,
		    street_address: street_address,
		    city: city,
		    state: state,
		    country: country,
		    phone_number: phone_number
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ userId: data._id });
    });
  }

  put(
    name,
    company_name,
    company_id,
    user_position,
    email,
    street_address,
    city,
    state,
    country,
    phone_number) {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/users/' + this.state.userId, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: name,
        company_name: company_name,
		    company_id: company_id,
		    user_position: user_position,
		    email: email,
		    street_address: street_address,
		    city: city,
		    state: state,
		    country: country,
		    phone_number: phone_number
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  delete(userId) {
    let urlTemp = sessionStorage.getItem('user').split(',')[2],
        url = urlTemp.replace('http://localhost:3001', 'https://machapi.herokuapp.com'),
        request = new Request(url + '/users/' + userId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
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
    	this.post(this.state.userInfo.name,
						    this.state.userInfo.company_name,
						    this.state.userInfo.company_id,
						    this.state.userInfo.user_position,
						    this.state.userInfo.email,
						    this.state.userInfo.street_address,
						    this.state.userInfo.city,
						    this.state.userInfo.state,
						    this.state.userInfo.country,
						    this.state.userInfo.phone_number);
    } else {
      this.put( this.state.userInfo.name,
						    this.state.userInfo.company_name,
						    this.state.userInfo.company_id,
						    this.state.userInfo.user_position,
						    this.state.userInfo.email,
						    this.state.userInfo.street_address,
						    this.state.userInfo.city,
						    this.state.userInfo.state,
						    this.state.userInfo.country,
						    this.state.userInfo.phone_number);
    }
    this.toggleEdit();

  }

  viewInfo() {
    let info;
    if(this.state.loaded) {
    	if (!this.state.editable) {
	      info = (
	        <div onClick={ this.toggleEdit }>
	        	<DescriptionItem header={'Name: '} value={this.state.userInfo.name} />
				    <DescriptionItem header={'Company Name: '} value={this.state.userInfo.company_name} />
				    <DescriptionItem header={'Company Id: '} value={this.state.userInfo.company_id} />
				    <DescriptionItem header={'User Position: '} value={this.state.userInfo.user_position} />
				    <DescriptionItem header={'Email: '} value={this.state.userInfo.email} />
				    <DescriptionItem header={'Street Address: '} value={this.state.userInfo.street_address} />
				    <DescriptionItem header={'City: '} value={this.state.userInfo.city} />
				    <DescriptionItem header={'State: '} value={this.state.userInfo.state} />
				    <DescriptionItem header={'Country: '} value={this.state.userInfo.country} />
				    <DescriptionItem header={'Phone Number: '} value={this.state.userInfo.phone_number} />
	        </div>
	      )
	    } else {
	      info = (
	        <div>

	        	<EditableItem header={'Name: '} value={this.state.userInfo.name} change={this.change} name={'name'} />
				    <EditableItem header={'Company Name: '} value={this.state.userInfo.company_name} change={this.change} name={'company_name'} />
						<EditableItem header={'Company Id: '} value={this.state.userInfo.company_id} change={this.change} name={'company_id'} />
						<EditableItem header={'User Position: '} value={this.state.userInfo.user_position} change={this.change} name={'user_position'} />
						<EditableItem header={'Email: '} value={this.state.userInfo.email} change={this.change} name={'email'} />
						<EditableItem header={'Street Address: '} value={this.state.userInfo.street_address} change={this.change} name={'street_address'} />
						<EditableItem header={'City: '} value={this.state.userInfo.city} change={this.change} name={'city'} />
						<EditableItem header={'State: '} value={this.state.userInfo.state} change={this.change} name={'state'} />
						<EditableItem header={'Country: '} value={this.state.userInfo.country} change={this.change} name={'country'} />
						<EditableItem header={'Phone Number: '} value={this.state.userInfo.phone_number} change={this.change} name={'phone_number'} />
	          <button onClick={ this.save } className='button save-button'>Save</button>
	        </div>
	      )
	    }
	    return (
	      <div className={'card left-column ' + (this.state.editable ? 'no-fade' : '')} >
	        {info}
	      </div>
	    )
    } else {
    	return null;
    }
	    
  }

  componentWillMount() {
    if (this.state.userId !== '0') {
      this.get();
    } else {
      this.setState({ editable: true, newUser: true });
    }
  }

  render() {
    let info = this.viewInfo();
    return (
      <div>
        <h3>User Profile</h3>
        <div className={(this.state.modalHide ? 'gone' : '')} >
          <DeleteModal delete={() => {this.delete(this.state.userId)}} reject={this.toggleModal} link={'/users'} />
        </div>
        <button className='button'> Clock In</button>
        <NavLink to={'/users'} className='button table-button'>Return to Users</NavLink>
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

export default UsersEditor;
