import React, { Component } from 'react';
import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
import { NavLink } from 'react-router-dom';
import DeleteModal from '../Main/DeleteModal';

class JobsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.href,
      jobId: this.props.match.params.partId ? this.props.match.params.partId : '0',
      jobInfo: {},
      editable: false,
      newJob: false,
      modalHide: true
    }
    this.setUrl=this.setUrl.bind(this);
    this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.change=this.change.bind(this);
    this.save=this.save.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
  }

  setUrl() {
    var url = window.location.href;
    var prefix = url.substring(0, 7);

    prefix = (prefix === 'http://') ? 'http://localhost:3001' : 'https://machapi.herokuapp.com';
    prefix = prefix.concat('/api');

    this.setState({ url: prefix });
  }

  get() {
    let request = new Request(this.state.url + '/jobs/' + this.state.jobId, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ jobInfo: data });
    })
  }

  post(
    user,
    number,
    material,
    partNumber) {
    let request = new Request(this.state.url + '/jobs', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: user,
        job_number: number,
        material: material,
        part_number: partNumber,
        date_started: ''
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ jobId: data._id });
    });
  }

  put(user, number, material, partNumber) {
    let request = new Request(this.state.url + '/jobs/' + this.state.jobInfo._id, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: user,
        job_number: number,
        material: material,
        part_number: partNumber,
        date_started: ''
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  delete(jobId) {
    let request = new Request(this.state.url + '/jobs/' + jobId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  change(e) {
    let newInfo = this.state.jobInfo
    newInfo[e.target.name] = e.target.value;
    this.setState({jobInfo: newInfo});
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  toggleModal() {
    this.setState({ modalHide: !this.state.modalHide });
  }

  save() {
    if( this.state.newJob ) {
      this.post(this.state.jobInfo.user,
                this.state.jobInfo.job_number,
                this.state.jobInfo.material,
                this.state.jobInfo.part_number);
    } else {
      this.put(this.state.jobInfo.user,
                this.state.jobInfo.job_number,
                this.state.jobInfo.material,
                this.state.jobInfo.part_number);
    }
    this.toggleEdit();

  }

  viewInfo() {
    let info;
    if (!this.state.editable) {
      info = (
        <div onClick={ this.toggleEdit }>
          <DescriptionItem header={'Job Number: '} value={this.state.jobInfo.job_number} />
          <DescriptionItem header= {'Material: '} value={this.state.jobInfo.material} />
          <DescriptionItem header={'PartNumber: '} value={this.state.jobInfo.part_number} />
        </div>
      )
    } else {
      info = (
        <div>
          <EditableItem header={'Job Number: '} value={this.state.jobInfo.job_number} change={this.change} name={'job_number'} />
          <EditableItem header={'Material: '} value={this.state.jobInfo.material} change={this.change} name={'material'} />
          <EditableItem header={'Part Number: '} value={this.state.jobInfo.part_number} change={this.change} name={'part_number'} />
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
    this.setUrl();
  }

  componentDidMount() {
    if (this.state.jobId !== '0') {
      this.get();
    } else {
      let newInfo = {user: '', job_number: '', material: '', part_number: ''};
      this.setState({ jobInfo: newInfo, editable: true, newJob: true });
    }
  }

  render() {
    let info = this.viewInfo();
    return (
      <div>
        <h3>Job Editor</h3>
        <div className={(this.state.modalHide ? 'gone' : '')} >
          <DeleteModal delete={() => {this.delete(this.state.partId)}} reject={this.toggleModal} link={'/jobs'} />
        </div>
        <NavLink to={'/jobs'} className='button table-button'>Return to Jobs</NavLink>
        <button
          className='button table-button delete-button'
          onClick={this.toggleModal}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div className='edit-page'>
          {info}
          <div className='work-flow card'>
          </div>
        </div>
      </div>
    );
  }
}

export default JobsEditor;
