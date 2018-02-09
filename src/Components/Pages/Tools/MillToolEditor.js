import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
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
    }
  }

  viewInfo() {

  	let info;

  	if(!this.state.editable) {
  		info = (<div onClick={this.toggleEdit}>
  			<DescriptionItem header={'Tool Type: '} value={this.props.toolData.tool_type} />
        <DescriptionItem header={'Diameter: '} value={this.props.toolData.diameter} />
        <DescriptionItem header={'Material: '} value={this.props.toolData.material} />
        <DescriptionItem header={'Flutes: '} value={this.props.toolData.flutes} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'Tip Angle: '} value={this.props.toolData.tip_angle} classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}/>
        <DescriptionItem header={'Flute Length: '} value={this.props.toolData.flute_length} />
        <DescriptionItem header={'Corner Radius: '} value={this.props.toolData.corner_radius} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'Tool Length: '} value={this.props.toolData.tool_length} />
        <DescriptionItem header={'Undercut Width: '} value={this.props.toolData.undercut_width} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'Undercut Length: '} value={this.props.toolData.undercut_length} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'EDP Number: '} value={this.props.toolData.edp} />
        <DescriptionItem header={'Notes: '} value={this.props.toolData.notes} />
        {/*<DescriptionItem header={'Job Number: '} value={this.props.toolData.job_number}/>*/}
  		</div>)
  	} else {
  		info = (<div>
        <EditableItem
          header={'Tool Type: '}
          value={this.props.toolData.tool_type || 'Endmill'}
          type={'select'}
          output={this.props.output}
          name={'tool_type'}
          data={[
            { value: 'Endmill', children: 'Endmill' },
            { value: 'Drill', children: 'Drill' },
            { value: 'Other', children: 'Other' }
          ]}
          onClick={this.showTool} />
        <EditableItem
          type={'math'}
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
          classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}
          header={'Flutes: '}
          value={this.props.toolData.flutes}
          change={this.props.change}
          name={'flutes'}
          type='number'
          onClick={this.showTool} />
        <EditableItem
          classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}
          header={'Tip Angle: '}
          value={this.props.toolData.tip_angle || '118'}
          change={this.props.change}
          name={'tip_angle'}
          type='number'
          onClick={this.showTool} />
        <EditableItem
          header={'Flute Length: '}
          value={this.props.toolData.flute_length}
          change={this.props.change}
          name={'flute_length'}
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Corner Radius: '}
          classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}
          value={this.props.toolData.corner_radius}
          change={this.props.change}
          name={'corner_radius'}
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Tool Length: '}
          value={this.props.toolData.tool_length}
          change={this.props.change}
          name={'tool_length'}
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Undercut Width: '}
          classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}
          value={this.props.toolData.undercut_width }
          change={this.props.change}
          name={'undercut_width'}
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Undercut Length: '}
          classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}
          value={this.props.toolData.undercut_length}
          change={this.props.change}
          name={'undercut_length'}
          onClick={this.showTool}
          type={'math'} />
        <EditableItem header={'EDP Number: '} value={this.props.toolData.edp} change={this.props.change} name={'edp'} onClick={this.showTool} />
        <EditableItem header={'Notes: '} value={this.props.toolData.notes} change={this.props.change} name={'notes'} onClick={this.showTool} />
        {/*<EditableItem
            header={'Job Number: '}
            value={this.props.toolData.job_number}
            type={'select'}
            link={'/jobs/'}
            output={this.props.output}
            name={'job_number'} />*/}
        <span className='submit-button-line'><button onClick={this.save} className='button save-button small-button'>Save</button></span>
      </div>)
  	}

  	return (<div className={'card left-column ' + (this.state.editable ? 'no-fade' : '')} >
  			{info}
  		</div>);

  }

	componentDidMount() {
    this.props.change({ target: { name: 'tool_type', value: 'Endmill' }});
    this.props.change({ target: { name: 'material', value: 'Carbide' }});
    if(this.props.toolId === '0')
      this.setState({ editable: true });
	}

  render() {
  	let info = this.viewInfo();
    let mill = this.millImage();
    return (
    	<div>
        <div className='tool-image' >
          {mill}
        </div>
        <div className='edit-page'>
        	{info}
        	<div className='work-flow card no-fade'>
          </div>
        </div>
      </div>
    );
  }
}

export default MillToolEditor;
