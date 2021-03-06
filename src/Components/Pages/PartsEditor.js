import React, { Component } from 'react';
import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
import { NavLink } from 'react-router-dom';
import DeleteModal from '../Main/DeleteModal';
import MiniTable from '../Main/MiniTable';
import headers from '../AppInformation/TableHeaders';
import Drawing from './Drawing';

class PartsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partId: this.props.match.params.partId ? this.props.match.params.partId : '0',
      partInfo: {},
      editable: false,
      newPart: false,
      modalHide: true,
      jobData: [],
      loaded: false
    };

    this.get=this.get.bind(this);
    this.getJobs=this.getJobs.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.change=this.change.bind(this);
    this.save=this.save.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.renderTable=this.renderTable.bind(this);
    this.viewInfo=this.viewInfo.bind(this);
  }

  get() {
    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/parts/' + this.state.partId + '?company_id=' + id, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log('part loaded');
      this.setState({ partInfo: data });
    })
  }

  getJobs() {
    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/jobs?company_id=' + id, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log('jobs list loaded');
      let newData = data.filter( datum => { return datum.part_number === this.state.partInfo.part_number});
      this.setState({ jobData: newData, loaded: true });
    })
  }

  post(user, number, revision, name, customer) {
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/parts', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: user,
        company_id: sessionStorage.getItem('user').split(',')[1],
        part_number: number,
        part_revision: revision,
        part_name: name,
        customer: customer
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ partId: data._id });
    });
  }

  put(user, number, revision, name, customer) {
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/parts/' + this.state.partInfo._id, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: user,
        company_id: sessionStorage.getItem('user').split(',')[1],
        part_revision: revision, 
        part_number: number,
        part_name: name,
        customer: customer
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  delete() {
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/parts/' + this.state.partId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
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

  toggleModal() {
    this.setState({ modalHide: !this.state.modalHide });
  }

  renderTable() {
    if(this.state.loaded) {
      return (<MiniTable
        headers={headers.MiniJobs}
        data={this.state.jobData}
        url={this.state.url}
        link='/jobs/' />);
    } else {
      return null;
    }
  }

  save() {
    if( this.state.newPart ) {
      this.post(this.state.partInfo.user,
                this.state.partInfo.part_number,
                this.state.partInfo.part_revision,
                this.state.partInfo.part_name,
                this.state.partInfo.customer);
    } else {
      this.put(this.state.partInfo.user,
               this.state.partInfo.part_number,
               this.state.partInfo.part_revision,
               this.state.partInfo.part_name,
               this.state.partInfo.customer);
    }
    this.toggleEdit();

  }

  viewInfo() {
    let info, table = this.renderTable();
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
          <span className='submit-button-line'><button onClick={ this.save } className='button save-button small-button'>Save</button></span>
        </div>
      )
    }

    return (
      <div className={'card left-column ' + (this.state.editable ? 'no-fade' : '')} >
        {info}
        <div className='jobs-subsection'>
          <h4>Jobs</h4>
          {table}
          <NavLink to={'/jobs/0'} className={'button small-button'}>Add new job</NavLink>
        </div>
      </div>
    )
  }

  componentWillMount() {
    if (this.state.partId !== '0') {
      this.get();
      this.getJobs();
    } else {
      let newInfo = {part_name: '', part_number: '', part_revision: '', customer: '', user: ''};
      this.setState({ partInfo: newInfo, editable: true, newPart: true });
    }
  }

  componentDidMount() {
    
  }

  render() {
    let info = this.viewInfo();
    return (
      <div>
        <h3>Part Editor</h3>
        <div className={(this.state.modalHide ? 'gone' : '')} >
          <DeleteModal delete={this.delete} reject={this.toggleModal} link={'/parts'} />
        </div>
        <NavLink to={'/parts'} className='button table-button'>Return to Parts</NavLink>
        <button
          className='button table-button delete-button'
          onClick={this.toggleModal}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div className='edit-page'>
          {info}
          <div className='work-flow card no-fade'>
            <Drawing partNumber={this.state.partInfo.part_number} />
          </div>
        </div>
      </div>
    );
  }
}

export default PartsEditor;
