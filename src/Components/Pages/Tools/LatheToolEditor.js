import React, { Component } from 'react';
import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';
import Endmill from './SVGs/Endmill';
import Drill from './SVGs/Drill';
import fluxStore from '../../../Flux/fluxStore';

class LatheToolEditor extends Component {
	constructor(props) {
		super(props)
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
    { value: 'Boring Bar', children: 'Boring Bar' },
    { value: 'Insert', children: 'Insert'},
    { value: 'Center Drill', children: 'Center Drill'},
    { value: 'OD Tool', children: 'OD Tool'},
    { value: 'Groove Tool', children: 'Groove Tool'},
    { value: 'Drill', children: 'Drill' },
    { value: 'Cutoff Tool', children: 'Cutoff Tool'},
    { value: 'Other', children: 'Other' },
  ]

  materialChoices = [
    { value: 'Carbide', children: 'Carbide' },
    { value: 'Cobalt', children: 'Cobalt' },
    { value: 'High Speed Steel', children: 'High Speed Steel' },
    { value: 'Coated Carbide', children: 'Coated Carbide' },
    { value: 'Other', children: 'Other' }
  ]

  showItem(property) {
    // return this.toolProps(property).indexOf(fluxStore.getFormValue('tool_type')) !== -1 ? '' : 'gone';
    fluxStore.getFormValue('tool_type') === property ? '' : 'gone';
  }

  viewInfo() {

  	if(!this.state.editable) {
  		return <div onClick={this.toggleEdit} className={'tool-data'} >
  			<DescriptionItem header={'Tool Type: '} value={'tool_type'} />
        <DescriptionItem header={'Diameter: '} value={'diameter'} classes={this.showItem('Drill')}/>
        <DescriptionItem header={'Material: '} value={'material'} />
        <DescriptionItem header={'Tip Angle: '} value={'tip_angle'} classes={this.showItem('Drill')}/>
        <DescriptionItem header={'Flute Length: '} value={'flute_length'} classes={this.showItem('Drill')}/>
        <DescriptionItem header={'Tool Length: '} value={'tool_length'} />
        <DescriptionItem header={'Description: '} value={'description'} />
        <DescriptionItem header={'Insert Code: '} value={'insert'} />
        <DescriptionItem header={'Quantity: '} value={'count'} classes={this.props.order ? '' : 'gone'} />
        <DescriptionItem header={'Price: '} value={'price'} classes={'price ' + (this.props.order ? '' : 'gone')} />
        <DescriptionItem header={'Location: '} value={'location'} classes={this.props.order ? 'gone' : ''} />
        <DescriptionItem header={'Notes: '} value={'notes'} classes={'notes'} />

        {/*<DescriptionItem header={'Job Number: '} value={this.props.toolData.job_number}/>*/}
  		</div>
  	} else {
  		return <div className={'tool-data'} >
        <EditableItem
          header={'Tool Type: '}
          type={'select'}
          name={'tool_type'}
          properties={this.toolChoices}
          onClick={this.showTool} />
        <EditableItem
          classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}
          type={'math'}
          header={'Diameter: '}
          name={'diameter'}
          units='inches'
          onClick={this.showTool} />
        <EditableItem
          header={'Material: '}
          type={'select'}
          name={'material'}
          properties={this.materialChoices}
          onClick={this.showTool} />
        <EditableItem
          classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}
          header={'Tip Angle: '}
          name={'tip_angle'}
          units='degrees'
          type='number'
          onClick={this.showTool} />
        <EditableItem
          classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}
          header={'Flute Length: '}
          name={'flute_length'}
          units='inches'
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Tool Length: '}
          name={'tool_length'}
          units='inches'
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Description: '}
          name={'description'}
          onClick={this.showTool} />
        <EditableItem
          header={'Insert Code: '}
          name={'insert'}
          onClick={this.showTool} />
        <EditableItem
          header={'Quantity: '}
          type={'number'}
          name={'count'}
          onClick={this.showTool}
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
            name={'job_number'} />*/}
        <span className='submit-button-line'>
          <button onClick={this.cancel} className='button white-button small-button'>Cancel</button>
          <button onClick={this.save} className='button save-button small-button'>{this.state.cfmMsg}</button>
        </span>
      </div>
  	}
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

export default LatheToolEditor;
