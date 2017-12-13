import React, { Component } from 'react';
import DescriptionItem from '../Main/DescriptionItem';
import EditableItem from '../Main/EditableItem';
import { NavLink } from 'react-router-dom';
import DeleteModal from '../Main/DeleteModal';
import Operations from './Operations/Operations';

class JobsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: (window.location.href.substr(0, 7) === 'http://') ? 'http://localhost:3001/api' : 'https://machapi.herokuapp.com/api',
      jobId: this.props.match.params.jobId ? this.props.match.params.jobId : '0',
      jobInfo: {},
      editable: false,
      newJob: false,
      modalHide: true
    }
    this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.change=this.change.bind(this);
    this.save=this.save.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.selectOutput=this.selectOutput.bind(this);
  }

  get() {
    let request = new Request(this.state.url + '/jobs/' + this.state.jobId, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      console.log('job loaded');
      this.setState({ jobInfo: data });
    })
  }

  post(
    user,
    number,
    material,
    partNumber,
    dateToStart,
    description) {
    let request = new Request(this.state.url + '/jobs', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: user,
        job_number: number,
        material: material,
        part_number: partNumber,
        date_to_start: dateToStart,
        date_started: '-',
        description: description
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ jobId: data._id });
    });
  }

  put(user, number, material, partNumber, dateToStart, description) {
    let request = new Request(this.state.url + '/jobs/' + this.state.jobInfo._id, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: user,
        job_number: number,
        material: material,
        part_number: partNumber,
        date_to_start: dateToStart,
        date_started: '-',
        description: description
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
    let newInfo = this.state.jobInfo;
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
                this.state.jobInfo.part_number,
                this.state.jobInfo.date_to_start,
                this.state.jobInfo.description);
    } else {
      this.put(this.state.jobInfo.user,
                this.state.jobInfo.job_number,
                this.state.jobInfo.material,
                this.state.jobInfo.part_number,
                this.state.jobInfo.date_to_start,
                this.state.jobInfo.description);
    }
    this.toggleEdit();

  }

  selectOutput(value, name) {
    let newInfo = this.state.jobInfo;
    newInfo[name] = value;
    this.setState({ jobInfo: newInfo });
    console.log(this.state.jobInfo);
  }

  viewInfo() {
    let info;
    if (!this.state.editable) {
      info = (
        <div onClick={ this.toggleEdit }>
          <DescriptionItem header={'Job Number: '} value={this.state.jobInfo.job_number} />
          <DescriptionItem header= {'Material: '} value={this.state.jobInfo.material} />
          <DescriptionItem header={'Part Number: '} value={this.state.jobInfo.part_number}/>
          <DescriptionItem header={'Description: '} value={this.state.jobInfo.description} />
          <DescriptionItem header={'Date to Start: '} value={this.state.jobInfo.date_to_start} />
        </div>
      )
    } else {
      info = (
        <div>
          <EditableItem header={'Job Number: '} value={this.state.jobInfo.job_number} change={this.change} name={'job_number'} type={'number'} />
          <EditableItem header={'Material: '} value={this.state.jobInfo.material} change={this.change} name={'material'} />
          <EditableItem
            header={'Part Number: '}
            value={this.state.jobInfo.part_number}
            type={'select'}
            url={this.state.url}
            link={'/parts/'}
            output={this.selectOutput}
            name={'part_number'} />
          <EditableItem header={'Description: '} value={this.state.jobInfo.description} change={this.change} name={'description'} />
          <EditableItem header={'Date to Start: '} value={this.state.jobInfo.date_to_start} change={this.change} name={'date_to_start'} type={'date'} />
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
    if (this.state.jobId !== '0') {
      this.get();
    } else {
      let newInfo = {user: '-', job_number: '-', material: '-', part_number: '-', date_to_start: '-', description: '-'};
      this.setState({ jobInfo: newInfo, editable: true, newJob: true });
    }
  }

  render() {
    let info = this.viewInfo();
    return (
      <div>
        <h3>Job Editor</h3>
        <div className={(this.state.modalHide ? 'gone' : '')} >
          <DeleteModal delete={() => {this.delete(this.state.jobId)}} reject={this.toggleModal} link={'/jobs'} />
        </div>
        <NavLink to={'/jobs'} className='button table-button'>Return to Jobs</NavLink>
        <button
          className='button table-button delete-button'
          onClick={this.toggleModal}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div className='edit-page'>
          {info}
          <div className='work-flow-padding card no-fade'>
            <Operations />
          </div>
        </div>
      </div>
    );
  }
}

export default JobsEditor;
