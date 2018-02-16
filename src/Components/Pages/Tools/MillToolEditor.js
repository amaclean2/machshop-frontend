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
	}

  save() {
    this.toggleEdit();
    this.props.save();
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
  			<DescriptionItem header={'Tool Type: '} value={this.props.toolData.tool_type} />
        <DescriptionItem header={'Diameter: '} value={this.props.toolData.diameter} units={'inches'}/>
        <DescriptionItem header={'Material: '} value={this.props.toolData.material} />
        <DescriptionItem header={'Flutes: '} value={this.props.toolData.flutes} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'Tip Angle: '} value={this.props.toolData.tip_angle} classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')} units={'degrees'}/>
        <DescriptionItem header={'Flute Length: '} value={this.props.toolData.flute_length} units={'inches'}/>
        <DescriptionItem header={'Corner Radius: '} value={this.props.toolData.corner_radius} units={'inches'} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'Tool Length: '} value={this.props.toolData.tool_length} units={'inches'} />
        <DescriptionItem header={'Undercut Width: '} value={this.props.toolData.undercut_width} units={'inches'} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'Undercut Length: '} value={this.props.toolData.undercut_length} units={'inches'} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'EDP Number: '} value={this.props.toolData.edp} />
        <DescriptionItem header={'Notes: '} value={this.props.toolData.notes} />
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
            { value: 'Center Drill', children: 'Center Drill' },
            { value: 'Reemer', children: 'Reemer' },
            { value: 'Key Cutter', children: 'Key Cutter' },
            { value: 'Face Mill', children: 'Face Mill' },
            { value: 'Dove Mill', children: 'Dove Mill' },
            { value: 'Tap', children: 'Tap' },
            { value: 'Thread Mill', children: 'Thread Mill' },
            { value: 'Inserts', children: 'Inserts' },
            { value: 'Other', children: 'Other' }
          ]}
          onClick={this.showTool} />
        <EditableItem
          type={'math'}
          units={'inches'}
          header={'Diameter: '}
          value={this.props.toolData.diameter}
          change={this.props.change}
          name={'diameter'}
          onClick={this.showTool} />
        <EditableItem
          header={'Material: '}
          value={this.props.toolData.material}
          type={'select'}
          output={this.props.output}
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
          classes={(this.props.viewerMode === 'Endmill' ? '' : 'gone')}
          header={'Flutes: '}
          value={this.props.toolData.flutes}
          change={this.props.change}
          name={'flutes'}
          type='number'
          onClick={this.showTool} />
        <EditableItem
          classes={(this.props.viewerMode === 'Drill' ? '' : 'gone')}
          header={'Tip Angle: '}
          value={this.props.toolData.tip_angle}
          change={this.props.change}
          name={'tip_angle'}
          units={'degrees'}
          type='math'
          onClick={this.showTool} />
        <EditableItem
          header={'Flute Length: '}
          value={this.props.toolData.flute_length}
          change={this.props.change}
          name={'flute_length'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Corner Radius: '}
          classes={(this.props.viewerMode === 'Endmill' ? '' : 'gone')}
          value={this.props.toolData.corner_radius}
          change={this.props.change}
          name={'corner_radius'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Tool Length: '}
          value={this.props.toolData.tool_length}
          change={this.props.change}
          name={'tool_length'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Undercut Width: '}
          classes={(this.props.viewerMode === 'Endmill' ? '' : 'gone')}
          value={this.props.toolData.undercut_width !== '' ? this.props.toolData.undercut_width : this.props.toolData.diameter }
          change={this.props.change}
          name={'undercut_width'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Undercut Length: '}
          classes={(this.props.viewerMode === 'Endmill' ? '' : 'gone')}
          value={this.props.toolData.undercut_length !== '' ? this.props.toolData.undercut_length : 0 }
          change={this.props.change}
          name={'undercut_length'}
          units={'inches'}
          onClick={this.showTool}
          type={'math'} />
        <EditableItem header={'EDP Number: '} value={this.props.toolData.edp} change={this.props.change} name={'edp'} onClick={this.showTool} />
        <EditableItem header={'Notes: '} value={this.props.toolData.notes} change={this.props.change} name={'notes'} onClick={this.showTool} />
        <EditableItem
          header={'Count: '}
          value={this.props.count}
          change={this.props.changeCount}
          name={'count'}
          onClick={this.showTool}
          classes={(this.props.count !== 0 ? '' : 'gone')} />
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

  fillWithBlanks() {

      this.props.change({ target: { name: 'tool_type', value: 'Endmill' }});
      this.props.change({ target: { name: 'diameter', value: '' }});
      this.props.change({ target: { name: 'material', value: 'Carbide' }});
      this.props.change({ target: { name: 'flutes', value: '' }});
      this.props.change({ target: { name: 'tip_angle', value: '' }});
      this.props.change({ target: { name: 'flute_length', value: '' }});
      this.props.change({ target: { name: 'corner_radius', value: '' }});
      this.props.change({ target: { name: 'tool_length', value: '' }});
      this.props.change({ target: { name: 'undercut_width', value: '' }});
      this.props.change({ target: { name: 'undercut_length', value: '' }});
      this.props.change({ target: { name: 'edp', value: '' }});
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
