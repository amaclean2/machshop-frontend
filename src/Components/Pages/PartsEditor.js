import React, { Component } from 'react';
import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
import { NavLink } from 'react-router-dom';

class PartsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
      partId: this.props.match.params.partId,
      partInfo: {},
      editable: false
    }
    this.setUrl=this.setUrl.bind(this);
    this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.change=this.change.bind(this);
    this.save=this.save.bind(this);
  }

  setUrl() {
    var url = window.location.href;
    var prefix = url.substring(0, 7);

    prefix = (prefix === 'http://') ? 'http://localhost:3001' : 'https://machapi.herokuapp.com';
    prefix = prefix.concat('/api');

    this.setState({ url: prefix });
  }

  get() {
    let request = new Request(this.state.url + '/parts/' + this.state.partId, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ partInfo: data });
    })
  }

  post(user, number, revision, name, customer) {
    let request = new Request(this.state.url + '/parts', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: user,
        part_number: number,
        part_revision: revision,
        part_name: name,
        customer: customer
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log(data);
    });
  }

  put(user, number, revision, name, customer) {
    let request = new Request(this.state.url + '/parts/' + this.state.partInfo._id, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: user,
        part_revision: revision, 
        part_number: number,
        part_name: name,
        customer: customer
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log(data);
    });
  }

  delete(partId) {
    let request = new Request(this.state.url + '/parts/' + partId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log(data);
    });
  }

  change(e) {
    let newInfo = this.state.partInfo
    newInfo[e.target.name] = e.target.value;
    this.setState({partInfo: newInfo});
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  save() {
    this.put(this.state.partInfo.user,
             this.state.partInfo.part_number,
             this.state.partInfo.part_revision,
             this.state.partInfo.part_name,
             this.state.partInfo.customer);
    this.toggleEdit();

  }

  viewInfo() {
    let info;
    if (!this.state.editable) {
      info = (
        <div onClick={ this.toggleEdit }>
          <DescriptionItem header={'Part Number: '} value={this.state.partInfo.part_number} />
          <DescriptionItem header={'Revision: '} value={this.state.partInfo.part_revision} />
          <DescriptionItem header= {'Part Name: '} value={this.state.partInfo.part_name} />
          <DescriptionItem header= {'Customer: '} value={this.state.partInfo.customer} />
        </div>
      )
    } else {
      info = (
        <div>
          <EditableItem header={'Part Number: '} value={this.state.partInfo.part_number} change={this.change} name={'part_number'} />
          <EditableItem header={'Revision: '} value={this.state.partInfo.part_revision} change={this.change} name={'part_revision'} />
          <EditableItem header= {'Part Name: '} value={this.state.partInfo.part_name} change={this.change} name={'part_name'} />
          <EditableItem header= {'Customer: '} value={this.state.partInfo.customer} change={this.change} name={'customer'} />
          <NavLink to={'/parts'} onClick={ this.save } className='button save-button'>Save</NavLink>
        </div>
      )
    }
    return (
      <div className='card' >
        {info}
      </div>
    )
  }

  componentWillMount() {
    this.setUrl();
  }

  componentDidMount() {
    this.get();
  }

  render() {
    let info = this.viewInfo();
    return (
      <div>
        <h3>Part Editor</h3>
        {info}
      </div>
    );
  }
}

export default PartsEditor;
