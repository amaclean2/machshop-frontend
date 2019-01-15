import React, { Component } from 'react';
import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';
import { NavLink } from 'react-router-dom';
import DeleteModal from '../../Main/DeleteModal';
import Operations from '../Operations/Operations';

class JobEditorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobId: this.props.id,
      editable: false,
      loaded: false,
      modalHide: true,
      newJob: false,
      modalHide: true,
      operationCount: 0
    }
    this.get=this.get.bind(this);
    this.post=this.post.bind(this);
    this.put=this.put.bind(this);
    this.delete=this.delete.bind(this);
    this.toggleEdit=this.toggleEdit.bind(this);
    this.save=this.save.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.selectOutput=this.selectOutput.bind(this);
    this.deleteOperation=this.deleteOperation.bind(this);
    this.saveNewOperation=this.saveNewOperation.bind(this);
    this.addOperation=this.addOperation.bind(this);
  }

  get() {
    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/jobs/' + this.state.jobId + '?company_id=' + id, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ jobInfo: data, operationCount: data.operations.length });
    })
  }

  post(
    user,
    number,
    material,
    partNumber,
    dateToStart,
    description) {
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/jobs', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        user: user,
        company_id: sessionStorage.getItem('user').split(',')[1],
        job_number: number,
        material: material,
        part_number: partNumber,
        date_to_start: dateToStart,
        date_started: '-',
        description: description,
        operations: []
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({ jobId: data._id });
    });
  }

  put(user, number, material, partNumber, dateToStart, description) {
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/jobs/' + this.state.jobInfo._id, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: user,
        company_id: sessionStorage.getItem('user').split(',')[1],
        job_number: number,
        material: material,
        part_number: partNumber,
        date_to_start: dateToStart,
        date_started: '-',
        description: description,
        operations: []
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  saveNewOperation(opData, index) {
    let operations = this.state.jobInfo.operations;

    if(index > this.state.jobInfo.operations.length) {
      operations.push(opData);
    } else {
      operations[index] = opData;
    }

    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/jobs/' + this.state.jobInfo._id, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: this.state.jobInfo.user,
        company_id: this.state.jobInfo.company_id,
        job_number: this.state.jobInfo.job_number,
        material: this.state.jobInfo.material,
        part_number: this.state.jobInfo.part_number,
        date_to_start: this.state.jobInfo.date_to_start,
        date_started: this.state.jobInfo.date_started,
        description: this.state.jobInfo.description,
        operations: operations
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({jobInfo: data, operationCount: data.operations.length });
    });
      
  }

  deleteOperation(index) {
    let operations = this.state.jobInfo.operations;
    operations.splice(index, 1);
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/jobs/' + this.state.jobInfo._id, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        user: this.state.jobInfo.user,
        company_id: this.state.jobInfo.company_id,
        job_number: this.state.jobInfo.job_number,
        material: this.state.jobInfo.material,
        part_number: this.state.jobInfo.part_number,
        date_to_start: this.state.jobInfo.date_to_start,
        date_started: this.state.jobInfo.date_started,
        description: this.state.jobInfo.description,
        operations: operations
      })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
      this.setState({jobInfo: data, operationCount: data.operations.length });
    });
  }

  delete(jobId) {
    let url = sessionStorage.getItem('user').split(',')[2],
        request = new Request(url + '/jobs/' + jobId, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request).then( response => {
      return response.json();
    }).then( data => {
    });
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable });
  }

  toggleModal() {
    this.setState({ modalHide: !this.state.modalHide });
  }

  save() {
    this.toggleEdit();
  }

  selectOutput(value, name) {
    let newInfo = this.state.jobInfo;
    newInfo[name] = value;
  }

  viewInfo() {
    if (!this.state.editable) {
      return (<div onClick={ this.toggleEdit }>
          <DescriptionItem
            header={'Job Number'}
            value={'job_number'} />
          <DescriptionItem
            header= {'Material'}
            value={'material'} />
          <DescriptionItem
            header={'Part Number'}
            value={'part_number'}/>
          <DescriptionItem
            header={'Revision'}
            value={'revision'}/>
          <DescriptionItem
            header={'Description'}
            value={'description'} />
          <DescriptionItem
            header={'Date to Finish'}
            value={'date_to_finish'} />
        </div>);
    } else {
      return (<div>
          <EditableItem
            header={'Job Number'}
            name={'job_number'} 
            type={'number'} />
          <EditableItem 
            header={'Material'}
            name={'material'} />
          <EditableItem
            header={'Part Number'}
            name={'part_number'} />
          <EditableItem
            header={'Revision'}
            name={'revision'} />
          <EditableItem 
            header={'Description'} 
            name={'description'} />
          <EditableItem 
            header={'Date to Finish'} 
            name={'date_to_finish'}
            time={false}
            type={'date'} />
          <div className='button-bar'>
            <button onClick={ this.toggleEdit } className='button white-button'>Cancel</button>
            <button onClick={ this.save } className='button save-button'>Save</button>
          </div>
        </div>);
    }
  }

  componentWillMount() {
    if (this.state.jobId !== '0') {
      this.get();
    } else {
      this.setState({ editable: true, newJob: true });
    }
  }

  renderOperations() {
    if(this.state.jobInfo.operations) {
      return (<Operations
                data={this.state.jobInfo}
                saveNewOperation={this.saveNewOperation}
                operationCount={this.state.operationCount}
                addOperation={this.addOperation}
                deleteOperation={this.deleteOperation}/>);
    }
    else
      return null;
  }

  addOperation() {
    this.setState({operationCount: this.state.operationCount + 1});
  }

  render() {
    let info = this.viewInfo();
    // let operations = this.renderOperations();
    return (
      <div id="Pages/Jobs/JobEditorModal" className="job-modal" >
        <div className="sidenav-background" onClick={this.toggleModal} ></div>
        <div className="modal-container">
          <div className="modal-content editor">
            <div className="modal-top">
              <h3>Job Editor</h3>
              <div className={(this.state.modalHide ? 'gone' : '')} >
                <DeleteModal delete={() => {this.delete(this.state.jobId)}} reject={this.toggleModal} link={'/jobs'} />
              </div>
              {/*<NavLink to={'/jobs'} className='button table-button'>Return to Jobs</NavLink>*/}
              <div className="modal-corner-buttons">
                <button
                  className={'button table-button delete-button ' + (this.state.jobId === '0' ? 'gone' : '')}
                  onClick={this.toggleDeleteModal} >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button onClick={() => { this.props.toggleModal('0'); }} className={'button table-button close-modal-button close-button '}>
                  <span className='close-small'><i className="fa fa-times close-x"></i></span>
                  <span className='close-big'>Return to Jobs List</span>
                </button>
              </div>
            </div>
            <div className='edit-page'>
              {info}
              <div className='work-flow-padding card no-fade'>
                {/*operations*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobEditorModal;
