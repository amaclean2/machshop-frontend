import React, { Component } from 'react';

import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';
import Endmill from './SVGs/Endmill';
import Drill from './SVGs/Drill';
import fluxStore from '../../../Flux/fluxStore';

class MillToolEditor extends Component {
	constructor() {
		super()
		this.state = {
      diameter: false,
			editable: false,
      fluteLength: false,
      radius: false,
      toolLength: false,
      undercut: false,
      cfmMsg: 'Save'
		}
		this.toggleEdit=this.toggleEdit.bind(this);
    this.showTool=this.showTool.bind(this);
    this.save=this.save.bind(this);
    this.toolProps=this.toolProps.bind(this);
    this.presets=this.presets.bind(this);
    this.cancel=this.cancel.bind(this);
	}

  cancel() {
    this.toggleEdit();
    if(this.state.cfmMsg === 'Confirm')
      this.props.cancel();
  }

  save() {
    this.toggleEdit();
    if(this.state.cfmMsg === 'Confirm') {
      this.props.buyTool();
    } else {
      this.props.save();
    }
  }

  componentWillReceiveProps(props) {
    if(props.readyToBuy)
      this.setState({ editable: true, cfmMsg: 'Confirm' });
  }

  toolProps(property) {

    switch(property) {

      case 'material' :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Face Mill', 'Tap', 'Center Drill', 'Key Cutter', 'Dove Mill', 'Inserts'];

      case 'tool_length' :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Tap', 'Center Drill', 'Key Cutter', 'Dove Mill'];

      case 'diameter' :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Face Mill', 'Key Cutter', 'Dove Mill'];

      case 'flutes' :
        return ['Endmill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Face Mill', 'Tap', 'Key Cutter', 'Dove Mill'];

      case 'tip_angle' :
        return ['Drill', 'Spot Drill', 'Chamfer Mill', 'Tap', 'Dove Mill', 'Center Drill', 'Inserts'];

      case 'flute_length' :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Tap'];

      case 'corner_radius' :
        return ['Endmill', 'Key Cutter', 'Dove Mill', 'Inserts'];

      case 'relief_length' :
        return ['Endmill', 'Key Cutter', 'Dove Mill'];

      case 'relief_width' :
        return ['Endmill', 'Key Cutter', 'Dove Mill'];

      case 'size' :
        return ['Drill', 'Center Drill', 'Tap'];

      case 'cutting_height' :
        return ['Key Cutter', 'Inserts'];

      case 'description' :
        return ['Inserts'];

      case 'pitch' :
        return ['Tap'];

      default :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Face Mill', 'Tap', 'Center Drill', 'Key Cutter', 'Dove Mill', 'Inserts', 'Other'];
    }
  }

  showTool(e) {
    switch(e.target.name) {
      case 'tip_angle':
      case 'diameter':
        this.setState({ diameter: true,
                        fluteLength: false,
                        radius: false,
                        toolLength: false,
                        undercut: false });
        break;
      case 'flute_length':
        this.setState({ diameter: false,
                        fluteLength: true,
                        radius: false,
                        toolLength: false,
                        undercut: false });
        break;
      case 'corner_radius':
        this.setState({ fluteLength: false,
                        diameter: false,
                        radius: true,
                        toolLength: false,
                        undercut: false });
        break;
      case 'tool_length':
        this.setState({ fluteLength: false,
                        radius: false,
                        diameter: false,
                        toolLength: true,
                        undercut: false });
        break;
      case 'undercut_width':
      case 'undercut_length':
        this.setState({ fluteLength: false,
                        radius: false,
                        diameter: false,
                        toolLength: false,
                        undercut: true });
        break;
      default:
        this.setState({ fluteLength: false,
                        radius: false,
                        diameter: false,
                        toolLength: false,
                        undercut: false });
        break;
    }
  }

	toggleEdit() {
		this.setState({ editable: !this.state.editable });
	}

  millImage() {
    switch(this.props.toolData.tool_type) {
      case 'Endmill' :
        return (<Endmill 
                  fluteLength={this.state.fluteLength}
                  radius={this.state.radius} 
                  toolLength={this.state.toolLength} 
                  undercut={this.state.undercut}
                  diameter={this.state.diameter} />);
      case 'Drill' :
        return (<Drill
                  fluteLength={this.state.fluteLength}
                  radius={this.state.radius}
                  toolLength={this.state.toolLength}
                  diameter={this.state.diameter} />);
      default :
        return '';
    }
  }

  toolChoices = [
    { value: 'Endmill', children: 'Endmill' },
    { value: 'Drill', children: 'Drill' },
    { value: 'Spot Drill', children: 'Spot Drill' },
    { value: 'Chamfer Mill', children: 'Chamfer Mill'},
    { value: 'Center Drill', children: 'Center Drill' },
    { value: 'Reamer', children: 'Reamer' },
    { value: 'Key Cutter', children: 'Key Cutter' },
    { value: 'Face Mill', children: 'Face Mill' },
    { value: 'Dove Mill', children: 'Dove Mill' },
    { value: 'Tap', children: 'Tap' },
    { value: 'Inserts', children: 'Inserts' },
    { value: 'Other', children: 'Other' }
  ];

  materialChoices = [
    { value: 'Carbide', children: 'Carbide' },
    { value: 'Cobalt', children: 'Cobalt' },
    { value: 'High Speed Steel', children: 'High Speed Steel' },
    { value: 'Coated Carbide', children: 'Coated Carbide' },
    { value: 'Other', children: 'Other' }
  ];

  viewInfo() {
  	if(!this.state.editable) {
  		return <div onClick={this.toggleEdit} className='tool-data'>
  			<DescriptionItem
          header={'Tool Type: '}
          value={'tool_type'} />
        <DescriptionItem
          header={'Description: '}
          value={'description'} 
          classes={(this.toolProps('description').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'Size: '}
          value={'size'}
          classes={(this.toolProps('size').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'Diameter: '}
          value={'diameter'}
          classes={(this.toolProps('diameter').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          units={'inches'}/>
        <DescriptionItem
          header={'Material: '}
          classes={(this.toolProps('material').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          value={'material'} />
        <DescriptionItem
          header={'Flutes: '}
          value={'flutes'}
          classes={(this.toolProps('flutes').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={this.props.toolData.tool_type === 'Dove Mill' ? 'Angle: ' : 'Tip Angle: '}
          value={'tip_angle'}
          classes={(this.toolProps('tip_angle').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          units={'degrees'}/>
        <DescriptionItem
          header={'Flute Length: '}
          value={'flute_length'}
          classes={(this.toolProps('flute_length').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          units={'inches'}/>
        <DescriptionItem
          header={'Corner Radius: '}
          value={'corner_radius'}
          units={'inches'}
          classes={(this.toolProps('corner_radius').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'Tool Length: '}
          value={'tool_length'}
          classes={(this.toolProps('tool_length').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          units={'inches'} />
        <DescriptionItem
          header={this.props.toolData.tool_type === 'Inserts' ? 'Thickness: ' : 'Cutting Height: '}
          value={'cutting_height'}
          classes={(this.toolProps('cutting_height').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          units={'inches'} />
        <DescriptionItem
          header={'Relief Width: '}
          value={'undercut_width'}
          units={'inches'}
          classes={(this.toolProps('relief_width').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'Relief Length: '}
          value={'undercut_length'}
          units={'inches'}
          classes={(this.toolProps('relief_length').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'EDP Number: '}
          value={'edp'} />
        <DescriptionItem
          header={'Quantity: '}
          value={'count'}
          classes={this.props.order ? '' : 'gone'} />
        <DescriptionItem
          header={'Price: '}
          value={'price'}
          classes={'price ' + (this.props.order ? '' : 'gone')} />
        <DescriptionItem
          header={'Location: '}
          value={'location'}
          classes={this.props.order ? 'gone' : ''} />
        <DescriptionItem
          header={'Notes: '}
          value={'notes'}
          classes={'notes'} />
        {/*<DescriptionItem header={'Job Number: '} value={this.props.toolData.job_number}/>*/}
  		</div>

  	} else {

  		return <div className='tool-data'>
        <EditableItem
          header={'Tool Type: '}
          type={'select'}
          output={this.props.output}
          name={'tool_type'}
          properties={this.toolChoices}
          onClick={this.showTool} />
        <EditableItem
          header={'Description: '}
          classes={(this.toolProps('description').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          data={this.props.toolData}
          name={'description'} />
        <EditableItem
          header={'Size: '}
          classes={(this.toolProps('size').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          data={this.props.toolData}
          name={'size'}
          type={'size'}
          onClick={this.showTool} />
        <EditableItem
          type={'math'}
          units={'inches'}
          header={'Diameter: '}
          data={this.props.toolData}
          classes={(this.toolProps('diameter').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          name={'diameter'}
          onClick={this.showTool} />
        <EditableItem
          header={'Material: '}
          type={'select'}
          output={this.props.output}
          classes={(this.toolProps('material').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          name={'material'}
          properties={this.materialChoices}
          onClick={this.showTool} />
        <EditableItem
          header={'Flutes: '}
          classes={(this.toolProps('flutes').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          name={'flutes'}
          type='number'
          onClick={this.showTool} />
        <EditableItem
          classes={(this.toolProps('tip_angle').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          header={this.props.toolData.tool_type === 'Dove Mill' ? 'Angle: ' : 'Tip Angle: '}
          name={'tip_angle'}
          data={this.props.toolData}
          units={'degrees'}
          type='math'
          onClick={this.showTool} />
        <EditableItem
          header={'Flute Length: '}
          classes={(this.toolProps('flute_length').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          data={this.props.toolData}
          name={'flute_length'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Corner Radius: '}
          classes={(this.toolProps('corner_radius').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          name={'corner_radius'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Tool Length: '}
          classes={(this.toolProps('tool_length').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          name={'tool_length'}
          data={this.props.toolData}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={this.props.toolData.tool_type === 'Inserts' ? 'Thickness: ' : 'Cutting Height: '}
          classes={(this.toolProps('cutting_height').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          name={'cutting_height'}
          type={'math'}
          units={'inches'} />
        <EditableItem
          header={'Relief Width: '}
          classes={(this.toolProps('relief_width').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          data={this.props.toolData}
          name={'undercut_width'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Relief Length: '}
          classes={(this.toolProps('relief_length').indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone')}
          name={'undercut_length'}
          units={'inches'}
          onClick={this.showTool}
          type={'math'} />
        <EditableItem
          header={'EDP Number: '}
          name={'edp'}
          onClick={this.showTool} />
        <EditableItem
          header={'Quantity: '}
          name={'count'}
          onClick={this.showTool}
          type={'number'}
          classes={(this.props.count !== 0 ? '' : 'gone')} />
        <EditableItem
          header={'Price: '}
          name={'price'}
          onClick={this.showTool}
          type={'price'}
          classes={this.props.order ? '' : 'gone'} />
        <EditableItem
          header={'Location: '}
          name={'location'}
          onClick={this.showTool}
          classes={this.props.order ? 'gone' : ''} />
        <EditableItem
          header={'Notes: '}
          name={'notes'}
          onClick={this.showTool}
          type={'textArea'} />
        {/*<EditableItem
            header={'Job Number: '}
            value={this.props.toolData.job_number}
            type={'select'}
            link={'/jobs/'}
            output={this.props.output}
            name={'job_number'} />*/}
        <span className='submit-button-line'>
          <button onClick={this.cancel} className='button small-button white-button'>Cancel</button>
          <button onClick={this.save} className='button save-button small-button'>{this.state.cfmMsg}</button>
        </span>
      </div>
  	}
  }

  presets() {

  }

	componentDidMount() {
    if(this.props.toolId === '0') {
      this.setState({ editable: true });
    }
	}

  render() {
  	let info = this.viewInfo();
    let mill = this.millImage();
    return (
    	<div className='editor-content'>
        <div className='tool-image' >
          {mill}
        </div>
        <div className='edit-page'>
        	{info}
        </div>
      </div>
    );
  }
}

export default MillToolEditor;
