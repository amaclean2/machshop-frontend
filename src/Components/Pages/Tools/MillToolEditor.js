import React, { Component } from 'react';

import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';
import Endmill from './SVGs/Endmill';
import Drill from './SVGs/Drill';

class MillToolEditor extends Component {
	constructor(props) {
		super(props)
		this.state = {
      diameter: false,
			editable: false,
      fluteLength: false,
      radius: false,
      toolLength: false,
      undercut: false
		}
		this.toggleEdit=this.toggleEdit.bind(this);
    this.showTool=this.showTool.bind(this);
    this.save=this.save.bind(this);
    this.fillWithBlanks=this.fillWithBlanks.bind(this);
    this.toolProps=this.toolProps.bind(this);
    this.presets=this.presets.bind(this);
	}

  save() {
    this.toggleEdit();
    this.props.save();
  }

  toolProps(property) {

    switch(property) {
      case 'diameter' :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Face Mill', 'Key Cutter', 'Dove Mill'];

      case 'material' :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Face Mill', 'Tap', 'Center Drill', 'Key Cutter', 'Dove Mill', 'Inserts'];

      case 'flutes' :
        return ['Endmill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Face Mill', 'Tap', 'Key Cutter', 'Dove Mill'];

      case 'tip_angle' :
        return ['Drill', 'Spot Drill', 'Chamfer Mill', 'Tap', 'Dove Mill', 'Center Drill', 'Inserts'];

      case 'flute_length' :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Tap'];

      case 'corner_radius' :
        return ['Endmill', 'Key Cutter', 'Dove Mill', 'Inserts'];

      case 'tool_length' :
        return ['Endmill', 'Drill', 'Spot Drill', 'Chamfer Mill', 'Reamer', 'Tap', 'Center Drill', 'Key Cutter', 'Dove Mill'];

      case 'relief_length' :
        return ['Endmill', 'Key Cutter', 'Dove Mill'];

      case 'relief_width' :
        return ['Endmill', 'Key Cutter', 'Dove Mill'];

      case 'size' :
        return ['Drill', 'Center Drill', 'Tap'];

      case 'pitch' :
        return ['Tap'];

      case 'cutting_height' :
        return ['Key Cutter'];

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

  viewInfo() {

  	if(!this.state.editable) {
  		return <div onClick={this.toggleEdit} className='tool-data'>
  			<DescriptionItem
          header={'Tool Type: '}
          value={this.props.toolData.tool_type} />
        <DescriptionItem
          header={'Size: '}
          value={this.props.toolData.size}
          classes={(this.toolProps('size').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'Diameter: '}
          value={this.props.toolData.diameter}
          classes={(this.toolProps('diameter').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          units={'inches'}/>
        <DescriptionItem
          header={'Material: '}
          classes={(this.toolProps('material').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          value={this.props.toolData.material} />
        <DescriptionItem
          header={'Flutes: '}
          value={this.props.toolData.flutes}
          classes={(this.toolProps('flutes').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={this.props.toolData.tool_type === 'Dove Mill' ? 'Angle: ' : 'Tip Angle: '}
          value={this.props.toolData.tip_angle}
          classes={(this.toolProps('tip_angle').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          units={'degrees'}/>
        <DescriptionItem
          header={'Flute Length: '}
          value={this.props.toolData.flute_length}
          classes={(this.toolProps('flute_length').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          units={'inches'}/>
        <DescriptionItem
          header={'Corner Radius: '}
          value={this.props.toolData.corner_radius}
          units={'inches'}
          classes={(this.toolProps('corner_radius').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'Tool Length: '}
          value={this.props.toolData.tool_length}
          classes={(this.toolProps('tool_length').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          units={'inches'} />
        <DescriptionItem
          header={'Cutting Height: '}
          value={this.props.toolData.cutting_height}
          classes={(this.toolProps('cutting_height').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          units={'inches'} />
        <DescriptionItem
          header={'Relief Width: '}
          value={this.props.toolData.undercut_width}
          units={'inches'}
          classes={(this.toolProps('relief_width').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'Relief Length: '}
          value={this.props.toolData.undercut_length}
          units={'inches'}
          classes={(this.toolProps('relief_length').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}/>
        <DescriptionItem
          header={'EDP Number: '}
          value={this.props.toolData.edp} />
        <DescriptionItem
          header={'Quantity: '}
          value={this.props.toolData.count}
          classes={this.props.order ? '' : 'gone'} />
        <DescriptionItem
          header={'Price: '}
          value={this.props.toolData.price}
          classes={'price ' + (this.props.order ? '' : 'gone')} />
        <DescriptionItem
          header={'Location: '}
          value={this.props.toolData.location}
          classes={this.props.order ? 'gone' : ''} />
        <DescriptionItem
          header={'Notes: '}
          value={this.props.toolData.notes}
          classes={'notes'} />
        {/*<DescriptionItem header={'Job Number: '} value={this.props.toolData.job_number}/>*/}
  		</div>

  	} else {

  		return <div className='tool-data'>
        <EditableItem
          header={'Tool Type: '}
          value={this.props.toolData.tool_type}
          type={'select'}
          output={this.props.output}
          name={'tool_type'}
          data={[
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
          ]}
          onClick={this.showTool} />
        <EditableItem
          header={'Size: '}
          value={this.props.toolData.size}
          classes={(this.toolProps('size').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          change={this.props.change}
          name={'size'}
          type={'size'}
          onClick={this.showTool} />
        <EditableItem
          type={'math'}
          units={'inches'}
          header={'Diameter: '}
          value={this.props.toolData.size ? this.props.toolData.size : this.props.toolData.diameter }
          data={this.props.toolData}
          classes={(this.toolProps('diameter').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          change={this.props.change}
          name={'diameter'}
          onClick={this.showTool} />
        <EditableItem
          header={'Material: '}
          value={this.props.toolData.material}
          type={'select'}
          output={this.props.output}
          classes={(this.toolProps('material').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          name={'material'}
          data={[
            { value: 'Carbide', children: 'Carbide' },
            { value: 'Cobalt', children: 'Cobalt' },
            { value: 'High Speed Steel', children: 'High Speed Steel' },
            { value: 'Coated Carbide', children: 'Coated Carbide' },
            { value: 'Other', children: 'Other' }
          ]}
          onClick={this.showTool} />
        <EditableItem
          header={'Flutes: '}
          value={this.props.toolData.flutes}
          classes={(this.toolProps('flutes').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          change={this.props.change}
          name={'flutes'}
          type='number'
          onClick={this.showTool} />
        <EditableItem
          classes={(this.toolProps('tip_angle').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          header={this.props.toolData.tool_type === 'Dove Mill' ? 'Angle: ' : 'Tip Angle: '}
          value={this.props.toolData.tip_angle === '' || this.props.toolData.tip_angle === '0' ? this.props.toolData.tool_type : this.props.toolData.tip_angle }
          change={this.props.change}
          name={'tip_angle'}
          data={this.props.toolData}
          units={'degrees'}
          type='math'
          onClick={this.showTool} />
        <EditableItem
          header={'Flute Length: '}
          value={this.props.toolData.flute_length}
          classes={(this.toolProps('flute_length').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          change={this.props.change}
          name={'flute_length'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Corner Radius: '}
          classes={(this.toolProps('corner_radius').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          value={this.props.toolData.corner_radius}
          change={this.props.change}
          name={'corner_radius'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Tool Length: '}
          value={this.props.toolData.tool_length}
          classes={(this.toolProps('tool_length').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          change={this.props.change}
          name={'tool_length'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Cutting Height: '}
          value={this.props.toolData.cutting_height}
          classes={(this.toolProps('cutting_height').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          change={this.props.change}
          name={'cutting_height'}
          type={'math'}
          units={'inches'} />
        <EditableItem
          header={'Relief Width: '}
          classes={(this.toolProps('relief_width').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          value={this.props.toolData.undercut_width !== '' ? this.props.toolData.undercut_width : this.props.toolData.diameter }
          change={this.props.change}
          name={'undercut_width'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Relief Length: '}
          classes={(this.toolProps('relief_length').indexOf(this.props.toolData.tool_type) !== -1 ? '' : 'gone')}
          value={this.props.toolData.undercut_length !== '' ? this.props.toolData.undercut_length : 0 }
          change={this.props.change}
          name={'undercut_length'}
          units={'inches'}
          onClick={this.showTool}
          type={'math'} />
        <EditableItem
          header={'EDP Number: '}
          value={this.props.toolData.edp}
          change={this.props.change}
          name={'edp'}
          onClick={this.showTool} />
        <EditableItem
          header={'Quantity: '}
          value={this.props.toolData.count}
          change={this.props.change}
          name={'count'}
          onClick={this.showTool}
          type={'number'}
          classes={(this.props.count !== 0 ? '' : 'gone')} />
        <EditableItem
          header={'Price: '}
          value={this.props.toolData.price}
          change={this.props.change}
          name={'price'}
          onClick={this.showTool}
          type={'price'}
          classes={this.props.order ? '' : 'gone'} />
        <EditableItem
          header={'Location: '}
          value={this.props.toolData.location}
          change={this.props.change}
          name={'location'}
          onClick={this.showTool}
          classes={this.props.order ? 'gone' : ''} />
        <EditableItem
          header={'Notes: '}
          value={this.props.toolData.notes}
          change={this.props.change}
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
        <span className='submit-button-line'><button onClick={this.save} className='button save-button small-button'>Save</button></span>
      </div>
  	}
  }

  presets() {

  }

  fillWithBlanks() {

    this.props.change({ target: { name: 'tool_type', value: 'Endmill' }});
    this.props.change({ target: { name: 'size', value: '' }});
    this.props.change({ target: { name: 'diameter', value: '' }});
    this.props.change({ target: { name: 'material', value: 'Carbide' }});
    this.props.change({ target: { name: 'flutes', value: '' }});
    this.props.change({ target: { name: 'tip_angle', value: '' }});
    this.props.change({ target: { name: 'flute_length', value: '' }});
    this.props.change({ target: { name: 'corner_radius', value: '' }});
    this.props.change({ target: { name: 'tool_length', value: '' }});
    this.props.change({ target: { name: 'cutting_height', value: '' }});
    this.props.change({ target: { name: 'undercut_width', value: '' }});
    this.props.change({ target: { name: 'undercut_length', value: '' }});
    this.props.change({ target: { name: 'edp', value: '' }});
    this.props.change({ target: { name: 'count', value: '' }});
    this.props.change({ target: { name: 'price', value: '' }});
    this.props.change({ target: { name: 'location', value: ''}});
    this.props.change({ target: { name: 'notes', value: '' }});
  }

	componentDidMount() {
    if(this.props.toolId === '0') {
      this.setState({ editable: true });
      this.fillWithBlanks();
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
