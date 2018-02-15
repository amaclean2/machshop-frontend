import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class DeleteModal extends Component {

  render() {
    return (
      <div>
      	<div className='sidenav-background' onClick={this.props.reject} ></div>
      	<div className='modal-container'>
      		<div className='modal-content delete-modal'>
      			<span>Are you sure you want to delete this</span>
      			<div className='delete-modal-button-container'>
      				<button onClick={this.props.delete} className='button delete-modal-button accept'>Yes</button>
      				<button onClick={this.props.reject} className='button delete-modal-button reject'>No</button>
      			</div>
      		</div>
      	</div>
      </div>
    );
  }
}

export default DeleteModal;
