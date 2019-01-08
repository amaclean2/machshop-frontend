import React, { Component } from 'react';
import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';
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
    this.toolProps=this.toolProps.bind(this);
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

  toolProps(property) {

    switch(property) {
      case 'size' :
        return ['Center Drill', 'Drill'];

      case 'diameter' :
        return ['Boring Bar', 'Center Drill', 'Groove Tool', 'Drill'];

      case 'material' :
        return ['Boring Bar', 'Inserts', 'Center Drill', 'OD Tool', 'Groove Tool', 'Drill', 'Cutoff Tool', 'Other'];

      case 'tip_angle' :
        return ['Inserts', 'Center Drill', 'OD Tool', 'Groove Tool', 'Drill'];

      case 'corner_radius' :
        return ['Inserts', 'Groove Tool'];

      case 'flute_length' :
        return ['Center Drill', 'Drill'];

      case 'tool_length' :
        return ['Boring Bar', 'Center Drill', 'OD Tool', 'Groove Tool', 'Drill', 'Cutoff Tool'];

      case 'cutting_height' :
        return ['Inserts', 'Groove Tool'];

      case 'insert' :
        return ['Inserts'];

      case 'description' :
        return ['Inserts', 'Groove Tool', 'OD Tool', 'Other'];

      default :
        return ['Boring Bar', 'Inserts', 'Center Drill', 'OD Tool', 'Groove Tool', 'Drill', 'Cutoff Tool', 'Other'];
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
    { value: 'Tool Type', children: 'Tool Type'},
    { value: 'Boring Bar', children: 'Boring Bar' },
    { value: 'Inserts', children: 'Inserts'},
    { value: 'Center Drill', children: 'Center Drill'},
    { value: 'OD Tool', children: 'OD Tool'},
    { value: 'Groove Tool', children: 'Groove Tool'},
    { value: 'Drill', children: 'Drill' },
    { value: 'Cutoff Tool', children: 'Cutoff Tool'},
    { value: 'Other', children: 'Other' },
  ]

  materialChoices = [
    { value: 'Tool Material', children: 'Tool Material'},
    { value: 'Carbide', children: 'Carbide' },
    { value: 'Cobalt', children: 'Cobalt' },
    { value: 'High Speed Steel', children: 'High Speed Steel' },
    { value: 'Coated Carbide', children: 'Coated Carbide' },
    { value: 'Other', children: 'Other' }
  ]

  showItem(property) {
    return this.toolProps(property).indexOf(fluxStore.getFormValue('tool_type') && fluxStore.getFormValue('tool_type')[0]) !== -1 ? '' : 'gone';
  }

  viewInfo() {

  	if(!this.state.editable) {
  		return <div onClick={this.toggleEdit} className={'tool-data'} >
  			<DescriptionItem
          header={'Tool Type: '}
          value={'tool_type'} />
        <DescriptionItem
          header={'Size: '}
          value={'size'}
          classes={this.showItem('size')} />
        <DescriptionItem
          header={'Diameter: '}
          value={'diameter'}
          units={'inches'}
          classes={this.showItem('diameter')}/>
        <DescriptionItem
          header={'Material: '}
          value={'material'} />
        <DescriptionItem
          header={'Tip Angle: '}
          value={'tip_angle'}
          units={'degrees'}
          classes={this.showItem('tip_angle')}/>
        <DescriptionItem
          header={'Corner Radius: '}
          units={'inches'}
          classes={this.showItem('corner_radius')}
          value={'corner_radius'}/>
        <DescriptionItem
          header={'Flute Length: '}
          value={'flute_length'}
          units={'inches'}
          classes={this.showItem('flute_length')}/>
        <DescriptionItem
          header={'Thickness: '}
          value={'cutting_height'}
          classes={this.showItem('cutting_height')}
          units={'inches'} />
        <DescriptionItem
          header={'Tool Length: '}
          units={'inches'}
          value={'tool_length'} />
        <DescriptionItem
          header={'Description: '}
          classes={this.showItem('description')}
          value={'description'} />
        <DescriptionItem
          header={'Insert Code: '}
          classes={this.showItem('insert')}
          value={'insert'} />
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
          header={'Size: '}
          type={'size'}
          name={'size'}
          classes={this.showItem('size')}
          onClick={this.showTool} />
        <EditableItem
          classes={this.showItem('diameter')}
          type={'math'}
          header={'Diameter: '}
          name={'diameter'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Material: '}
          type={'select'}
          name={'material'}
          properties={this.materialChoices}
          classes={this.showItem('material')}
          onClick={this.showTool} />
        <EditableItem
          classes={this.showItem('tip_angle')}
          header={'Tip Angle: '}
          name={'tip_angle'}
          units={'degrees'}
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Corner Radius: '}
          classes={this.showItem('corner_radius')}
          name={'corner_radius'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          classes={this.showItem('flute_length')}
          header={'Flute Length: '}
          name={'flute_length'}
          units='inches'
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Tool Length: '}
          name={'tool_length'}
          units={'inches'}
          type={'math'}
          classes={this.showItem('tool_length')}
          onClick={this.showTool} />
        <EditableItem
          header={'Thickness: '}
          classes={this.showItem('cutting_height')}
          name={'cutting_height'}
          type={'math'}
          units={'inches'}
          onClick={this.showTool} />
        <EditableItem
          header={'Description: '}
          name={'description'}
          classes={this.showItem('description')}
          onClick={this.showTool} />
        <EditableItem
          header={'Insert Code: '}
          name={'insert'}
          classes={this.showItem('insert')}
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
        <span className='submit-button-line'>
          <button onClick={this.cancel} className='button white-button'>Cancel</button>
          <button onClick={this.save} className='button save-button'>{this.state.cfmMsg}</button>
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
    	<div className='editor-content' id='Pages/Tools/LatheToolEditor'>
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
