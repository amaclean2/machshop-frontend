import React, { Component } from 'react';

import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';

class MillSetupTemplate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: this.props.data,
      edit: false
		}

    this.toggleEdit=this.toggleEdit.bind(this);
	}

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  showForms() {
    if(this.state.edit) {
      return (<div>
        <h4>Part Info</h4>
        <div className={'setup-header'}>
            <EditableItem 
              header={'Part Number: '}
              name={'part_number'} />
            <EditableItem 
              header={'Part Name: '}
              name={'part_name'} />
            <EditableItem 
              header={'Customer: '}
              name={'customer'} />
            <EditableItem 
              header={'Job Number: '}
              name={'job_number'} />
            <EditableItem 
              header={'Revision: '}
              name={'revision'} />
            <EditableItem 
              header={'Operation: '}
              name={'operation'} />
          </div>
          <h4>Material Info</h4>
          <div className="material-info">
            <EditableItem 
              header={'Material: '}
              name={'material'} />
            <EditableItem 
              header={'Material Dimensions: '}
              name={'material_dimensions'} />
          </div>
          <h4>Work Holding</h4>
          <div className={'work-holding'}>
            <div className="column-group">
              <EditableItem 
                header={'X-Zero: '}
                name={'x_zero'} />
              <EditableItem 
                header={'Y-Zero: '}
                name={'y_zero'} />
              <EditableItem 
                header={'Z-Zero: '}
                name={'z_zero'} />
              <EditableItem 
                header={'A-Zero: '}
                name={'A_zero'} />
              <EditableItem 
                header={'B-Zero: '}
                name={'B_zero'} />
            </div>
            <div className="column-group"> 
              <EditableItem 
                header={'Machine Requirements: '}
                name={'machine_requirements'} />
              <EditableItem 
                header={'Parts per Cycle: '}
                name={'parts_per_cycle'} />
              <EditableItem 
                header={'Work Holding: '}
                name={'work_holding'}
                type={'textArea'} />
            </div>
          </div>
          <h4>Tools</h4>
          <div className={'setup-tools'}>
            Some tool selection goes here
          </div>
        <button onClick={this.toggleEdit} className='button white-button'>Cancel</button>
        <button onClick={this.toggleEdit} className='button save-button'>Save</button>
      </div>);
    } else {
      return (<div onClick={this.toggleEdit}>
          <h4>Part Info</h4>
          <div className={'setup-header'}>
            <DescriptionItem 
              header={'Part Number: '}
              value={'part_number'} />
            <DescriptionItem 
              header={'Part Name: '}
              value={'part_name'} />
            <DescriptionItem 
              header={'Customer: '}
              value={'customer'} />
            <DescriptionItem 
              header={'Job Number: '}
              value={'job_number'} />
            <DescriptionItem 
              header={'Revision: '}
              value={'revision'} />
            <DescriptionItem 
              header={'Operation: '}
              value={'operation'} />
          </div>
          <h4>Material Info</h4>
          <div className="material-info">
            <DescriptionItem 
              header={'Material: '}
              value={'material'} />
            <DescriptionItem 
              header={'Material Dimensions: '}
              value={'material_dimensions'} />
          </div>
          <h4>Work Holding</h4>
          <div className={'work-holding'}>
            <div className="column-group">
              <DescriptionItem 
                header={'X-Zero: '}
                value={'x_zero'} />
              <DescriptionItem 
                header={'Y-Zero: '}
                value={'y_zero'} />
              <DescriptionItem 
                header={'Z-Zero: '}
                value={'z_zero'} />
              <DescriptionItem 
                header={'A-Zero: '}
                value={'A_zero'} />
              <DescriptionItem 
                header={'B-Zero: '}
                value={'B_zero'} />
            </div>
            <div className="column-group">
              <DescriptionItem 
                header={'Machine Requirements: '}
                value={'machine_requirements'} />
              <DescriptionItem 
                header={'Parts per Cycle: '}
                value={'parts_per_cycle'} />
              <DescriptionItem 
              header={'Work Holding: '}
              value={'work_holding'} />
            </div>
          </div>
          <h4>Tools</h4>
          <div className={'setup-tools'}>
            Some tool selection goes here
          </div>
        </div>);
    }
  }

  render() {
    let form = this.showForms();
    return (
    	<div id="Pages/SetupSheets/MillSetupTemplate">
        {form}
      </div>
    );
  }
}

export default MillSetupTemplate;
