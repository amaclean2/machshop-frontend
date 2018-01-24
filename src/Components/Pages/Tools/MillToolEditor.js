import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';

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
    if(this.props.toolData.tool_type === 'Endmill')

      return (
        <svg height="50" width="500" version="1.1" id="Endmill" xmlns="http://www.w3.org/2000/svg" >
          <defs>
            <linearGradient id="shadow1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ 'stopOpacity': 0 }} />
              <stop offset="100%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} /> 
            </linearGradient>
            <linearGradient id="shadow2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} />
              <stop offset="100%" style={{ 'stopOpacity': 0 }} /> 
            </linearGradient>
            <linearGradient id="shadow3" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} />
              <stop offset="100%" style={{ 'stopOpacity': 0 }} />  
            </linearGradient>
          </defs>
          
          <path d="M 300 0 L 500 0 L 500 50 L 300 50 Z" fill={ this.state.fluteLength ? '#FC9' : '#89A' } />
          <path d="M 480 0 q 15 0 20 10 L 500 0" fill={ this.state.radius ? '#FC9' : 'transparent' } />
          <path d="M 480 50 q 15 0 20 -10 L 500 50" fill={ this.state.radius ? '#FC9' : 'transparent' } />
          
          <path d="M 250 0 c 40 0 50 50 100 50 L 400 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>
          <path d="M 300 0 c 40 0 50 50 100 50 L 450 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>
          <path d="M 350 0 c 40 0 50 50 100 50 L 500 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>
          <path d="M 400 0 c 40 0 50 50 100 50 L 550 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>
          <path d="M 450 0 c 40 0 50 50 100 50 L 600 50 c -50 0 -50 -50 -100 -50" fill="url(#shadow3)"/>

          <path d="M 290 0 c 40 0 50 50 100 50 L 400 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>
          <path d="M 340 0 c 40 0 50 50 100 50 L 450 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>
          <path d="M 390 0 c 40 0 50 50 100 50 L 500 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>
          <path d="M 440 0 c 40 0 50 50 100 50 L 550 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>
          <path d="M 490 0 c 40 0 50 50 100 50 L 600 50 c -50 0 -50 -50 -100 -50" fill="#89A"/>

          <path d="M 0 0 L 300 0 L 300 50 L0 50" fill="#EEE" />
          <path d="M 300 0 L 320 0 L 320 50 L 300 50" fill="#89A" />

          <path d="M 0 0 L 500 0 L 500 50 L 0 50" fill={ this.state.toolLength ? '#FC9' : 'transparent' } />
          <path d="M 150 5 L 290 5 L 290 45 L 150 45" fill={ this.state.undercut ? '#FC9' : 'transparent' } />
          <path d="M 490 0 L 500 0 L 500 50 L 490 50" fill={ this.state.diameter ? '#FC9' : 'transparent' } />

          <path d="M 0 20 L 500 20 L 500 30 L 0 30" fill="url(#shadow1)" />
          <path d="M 0 30 L 500 30 L 500 50 L 0 50" fill="url(#shadow2)" />
          <path d="M 0 50 L 500 50 L 500 50 L 0 50" fill="url(#shadow1)" />

          <path d="M 150 0 L 290 0 L 290 5 L 150 5" fill={ this.state.undercut ? '#FFF' : 'transparent' } />
          <path d="M 150 50 L 290 50 L 290 45 L 150 45" fill={ this.state.undercut ? '#FFF' : 'transparent' } />

        </svg>);
    else if (this.props.toolData.tool_type === 'drill') {

      return (
        <svg height="30" width="500" version="1.1" id="Endmill" xmlns="http://www.w3.org/2000/svg" >
          <defs>
            <linearGradient id="shadow1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ 'stopOpacity': 0 }} />
              <stop offset="100%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} /> 
            </linearGradient>
            <linearGradient id="shadow2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} />
              <stop offset="100%" style={{ 'stopOpacity': 0 }} /> 
            </linearGradient>
            <linearGradient id="shadow3" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" style={{ 'stopColor': 'rgba(0,0,0,0.2)' }} />
              <stop offset="100%" style={{ 'stopOpacity': 0 }} />  
            </linearGradient>
          </defs>
          
          <path d="M 0 0 L 300 0 L 300 30 L0 30" fill="#AAA" />
          <path d="M 250 0 L 500 0 L 500 30 L 250 30 Z" fill={ this.state.fluteLength ? '#FC9' : '#AAA' } />
          <path d="M 480 0 q 15 0 20 10 L 500 0" fill={ this.state.radius ? '#FC9' : 'transparent' } />
          <path d="M 480 50 q 15 0 20 -10 L 500 50" fill={ this.state.radius ? '#FC9' : 'transparent' } />
          
          <path d="M 250 0 c 40 0 50 30 100 30 L 400 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>
          <path d="M 300 0 c 40 0 50 30 100 30 L 450 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>
          <path d="M 350 0 c 40 0 50 30 100 30 L 500 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>
          <path d="M 400 0 c 40 0 50 30 100 30 L 550 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>
          <path d="M 450 0 c 40 0 50 30 100 30 L 600 30 c -50 0 -50 -30 -100 -30" fill="url(#shadow3)"/>

          <path d="M 290 0 c 40 0 50 30 100 30 L 400 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>
          <path d="M 340 0 c 40 0 50 30 100 30 L 450 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>
          <path d="M 390 0 c 40 0 50 30 100 30 L 500 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>
          <path d="M 440 0 c 40 0 50 30 100 30 L 550 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>
          <path d="M 490 0 c 40 0 50 30 100 30 L 600 30 c -50 0 -50 -30 -100 -30" fill="#AAA"/>

          <path d="M 0 0 L 500 0 L 500 30 L 0 30" fill={ this.state.toolLength ? '#FC9' : 'transparent' } />
          <path d="M 490 0 L 500 0 L 500 30 L 490 30" fill={ this.state.diameter ? '#FC9' : 'transparent' } />

          <path d="M 0 20 L 500 20 L 500 30 L 0 30" fill="url(#shadow1)" />
          <path d="M 0 30 L 500 30 L 500 30 L 0 30" fill="url(#shadow2)" />
          <path d="M 0 30 L 500 30 L 500 30 L 0 30" fill="url(#shadow1)" />
          <path d="M 490 0 L 500 0 L 500 15" fill="#FFF" />
          <path d="M 490 30 L 500 30 L 500 15" fill="#FFF" />

        </svg>);
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
        <DescriptionItem header={'Tip Angle: '} value={this.props.toolData.tip_angle} classes={(this.props.toolData.tool_type === 'drill' ? '' : 'gone')}/>
        <DescriptionItem header={'Flute Length: '} value={this.props.toolData.flute_length} />
        <DescriptionItem header={'Corner Radius: '} value={this.props.toolData.corner_radius} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'Tool Length: '} value={this.props.toolData.tool_length} />
        <DescriptionItem header={'Undercut Width: '} value={this.props.toolData.undercut_width} />
        <DescriptionItem header={'Undercut Length: '} value={this.props.toolData.undercut_length} classes={(this.props.toolData.tool_type === 'Endmill' ? '' : 'gone')}/>
        <DescriptionItem header={'EDP Number: '} value={this.props.toolData.edp} />
        <DescriptionItem header={'Notes: '} value={this.props.toolData.notes} />
        <DescriptionItem header={'Job Number: '} value={this.props.toolData.job_number}/>
  		</div>)
  	} else {
  		info = (<div>
        <EditableItem
          header={'Tool Type: '}
          value={this.props.toolData.tool_type}
          type={'select'}
          output={this.props.output}
          name={'tool_type'}
          data={[
            { value: 'Endmill', children: 'Endmill' },
            { value: 'Drill', children: 'Drill' },
            // { value: 'reemer', children: 'Reemer' },
            // { value: 'key_cutter', children: 'Key Cutter' },
            // { value: 'spot_drill', children: 'Spot Drill' },
            // { value: 'center_drill', children: 'Center Drill' },
            // { value: 'face_mill', children: 'Face Mill' },
            // { value: 'dove_mill', children: 'Dove Mill' },
            // { value: 'tap', children: 'Tap' },
            // { value: 'thread_mill', children: 'Thread Mill' },
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
          change={this.props.change}
          name={'material'}
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
          classes={(this.props.toolData.tool_type === 'drill' ? '' : 'gone')}
          header={'Tip Angle: '}
          value={this.props.toolData.tip_angle}
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
          value={this.props.toolData.undercut_width}
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
        <EditableItem
            header={'Job Number: '}
            value={this.props.toolData.job_number}
            type={'select'}
            link={'/jobs/'}
            output={this.props.output}
            name={'job_number'} />
        <span className='submit-button-line'><button onClick={this.save} className='button save-button small-button'>Save</button></span>
      </div>)
  	}

  	return (<div className={'card left-column ' + (this.state.editable ? 'no-fade' : '')} >
  			{info}
  		</div>);

  }

	componentDidMount() {
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
