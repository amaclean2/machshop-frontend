import React, { Component } from 'react';
import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';
import Endmill from './SVGs/Endmill';
import Drill from './SVGs/Drill';

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
    this.fillWithBlanks=this.fillWithBlanks.bind(this);
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

  viewInfo() {

  	if(!this.state.editable) {
  		return <div onClick={this.toggleEdit} className={'tool-data'} >
  			<DescriptionItem header={'Tool Type: '} value={this.props.toolData.tool_type} />
        <DescriptionItem header={'Diameter: '} value={this.props.toolData.diameter} classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}/>
        <DescriptionItem header={'Material: '} value={this.props.toolData.material} />
        <DescriptionItem header={'Tip Angle: '} value={this.props.toolData.tip_angle} classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}/>
        <DescriptionItem header={'Flute Length: '} value={this.props.toolData.flute_length} classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}/>
        <DescriptionItem header={'Tool Length: '} value={this.props.toolData.tool_length} />
        <DescriptionItem header={'Description: '} value={this.props.toolData.description} />
        <DescriptionItem header={'Insert Code: '} value={this.props.toolData.insert} />
        <DescriptionItem header={'Quantity: '} value={this.props.toolData.count} classes={this.props.order ? '' : 'gone'} />
        <DescriptionItem header={'Price: '} value={this.props.toolData.price} classes={'price ' + (this.props.order ? '' : 'gone')} />
        <DescriptionItem header={'Notes: '} value={this.props.toolData.notes} classes={'notes'} />

        {/*<DescriptionItem header={'Job Number: '} value={this.props.toolData.job_number}/>*/}
  		</div>
  	} else {
  		return <div className={'tool-data'} >
        <EditableItem
          header={'Tool Type: '}
          value={this.props.toolData.tool_type || 'Drill'}
          type={'select'}
          output={this.props.output}
          name={'tool_type'}
          data={[
            { value: 'Boring Bar', children: 'Boring Bar' },
            { value: 'Insert', children: 'Insert'},
            { value: 'Center Drill', children: 'Center Drill'},
            { value: 'OD Tool', children: 'OD Tool'},
            { value: 'Groove Tool', children: 'Groove Tool'},
            { value: 'Drill', children: 'Drill' },
            { value: 'Cutoff Tool', children: 'Cutoff Tool'},
            { value: 'Other', children: 'Other' },
          ]}
          onClick={this.showTool} />
        <EditableItem
          classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}
          type={'math'}
          header={'Diameter: '}
          value={this.props.toolData.diameter}
          change={this.props.change}
          name={'diameter'}
          units='inches'
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
          classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}
          header={'Tip Angle: '}
          value={this.props.toolData.tip_angle}
          change={this.props.change}
          name={'tip_angle'}
          units='degrees'
          type='number'
          onClick={this.showTool} />
        <EditableItem
          classes={(this.props.toolData.tool_type === 'Drill' ? '' : 'gone')}
          header={'Flute Length: '}
          value={this.props.toolData.flute_length}
          change={this.props.change}
          name={'flute_length'}
          units='inches'
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Tool Length: '}
          value={this.props.toolData.tool_length}
          change={this.props.change}
          name={'tool_length'}
          units='inches'
          type={'math'}
          onClick={this.showTool} />
        <EditableItem
          header={'Description: '}
          value={this.props.toolData.description}
          change={this.props.change}
          name={'description'}
          onClick={this.showTool} />
        <EditableItem
          header={'Insert Code: '}
          value={this.props.toolData.insert}
          change={this.props.change}
          name={'insert'}
          onClick={this.showTool} />
        <EditableItem
          header={'Quantity: '}
          type={'number'}
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
          type={'textArea'} />
        {/*<EditableItem
            header={'Job Number: '}
            value={this.props.toolData.job_number}
            type={'select'}
            link={'/jobs/'}
            output={this.props.output}
            name={'job_number'} />*/}
        <span className='submit-button-line'>
          <button onClick={this.toggleEdit} className='button white-button small-button'>Cancel</button>
          <button onClick={this.save} className='button save-button small-button'>{this.state.cfmMsg}</button>
        </span>
      </div>
  	}
  }

  fillWithBlanks() {

      this.props.change({ target: { name: 'tool_type', value: 'Drill' }});
      this.props.change({ target: { name: 'diameter', value: '' }});
      this.props.change({ target: { name: 'material', value: 'Cobalt' }});
      this.props.change({ target: { name: 'tip_angle', value: '' }});
      this.props.change({ target: { name: 'flute_length', value: '' }});
      this.props.change({ target: { name: 'tool_length', value: '' }});
      this.props.change({ target: { name: 'insert', value: '' }});
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

export default LatheToolEditor;
