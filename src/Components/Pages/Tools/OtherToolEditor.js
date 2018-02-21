import React, { Component } from 'react';
import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';
import Endmill from './SVGs/Endmill';
import Drill from './SVGs/Drill';

class OtherToolEditor extends Component {
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
  		return <div onClick={this.toggleEdit}>
        <DescriptionItem header={'Name: '} value={this.props.toolData.name} />
        <DescriptionItem header={'Description: '} value={this.props.toolData.description} />
        <DescriptionItem header={'Quantity: '} value={this.props.toolData.count} classes={this.props.order ? '' : 'gone'} />
        <DescriptionItem header={'Price: '} value={this.props.toolData.price} classes={this.props.order ? '' : 'gone'} />
        <DescriptionItem header={'Notes: '} value={this.props.toolData.notes} classes={'notes'} />
        {/*<DescriptionItem header={'Job Number: '} value={this.props.toolData.job_number}/>*/}
  		</div>
  	} else {
  		return <div>
        <EditableItem header={'Name: '} value={this.props.toolData.name} change={this.props.change} name={'name'} onClick={this.showTool} />
        <EditableItem header={'Description: '} value={this.props.toolData.description} change={this.props.change} name={'description'} onClick={this.showTool} />
        <EditableItem
          header={'Quantity: '}
          value={this.props.toolData.count}
          change={this.props.change}
          name={'count'}
          onClick={this.showTool}
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
          header={'Notes: '}
          value={this.props.toolData.notes}
          change={this.props.change}
          name={'notes'}
          onClick={this.showTool}
          type={'textArea'}/>
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
    this.props.change({ target: { name: 'name', value: '' }});
    this.props.change({ target: { name: 'description', value: '' }});
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

export default OtherToolEditor;
