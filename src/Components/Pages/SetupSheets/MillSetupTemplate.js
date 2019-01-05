import React, { Component } from 'react';

import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';
import fluxStore from '../../../Flux/fluxStore';
import * as fluxActions from '../../../Flux/actions';

class MillSetupTemplate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: this.props.data,
      edit: props.editView,
      tools: [{}]
		}

    this.addTool=this.addTool.bind(this);
    this.toolsList=this.toolsList.bind(this);
    this.parseTools=this.parseTools.bind(this);
    this.showMaterial=this.showMaterial.bind(this);
    this.showFluteLength=this.showFluteLength.bind(this);
    this.getAdditionalParameters=this.getAdditionalParameters.bind(this);
    this.save=this.save.bind(this);
	}

  save() {
    this.props.save();
    this.props.toggleEdit();
  }

  componentWillReceiveProps(props) {
      this.setState({ edit: props.editView, });
  }

  toolChoices = [
    { value: 'Tool Type', children: 'Tool Type'},
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

  showForms() {
    if(this.state.edit) {
      let toolsList = this.toolsList();
      return (<div>
        <h4>Part Information</h4>
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
          <h4>Material Information</h4>
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
                type={'textArea'}
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
          {toolsList}
        <button onClick={this.props.toggleEdit} className='button white-button'>Cancel</button>
        <button onClick={this.save} className='button save-button'>Save</button>
      </div>);
    } else {
      let descriptionList = this.descriptionToolsList();
      return (<div onClick={this.props.toggleEdit}>
          <div className="part-data">
            <div className="meta-block">
              <div className="name-block">
                <DescriptionItem
                  classes={'part-number-heading'}
                  header={'Part Number: '}
                  value={'part_number'} />
                <span className={'part-name-dash'}>-</span>
                <DescriptionItem 
                  header={'Part Name: '}
                  classes={'part-name-heading'}
                  value={'part_name'} />
              </div>
              <h4 className="desc-header">Part Information</h4>
              <DescriptionItem 
                header={'Revision: '}
                classes={'revision-heading'}
                value={'revision'} />
              <DescriptionItem 
                header={'Operation: '}
                classes={'operation-heading'}
                value={'operation'} />
              <DescriptionItem 
                header={'Job Number: '}
                classes={'job-number-heading'}
                value={'job_number'} />
              <DescriptionItem 
                header={'Customer: '}
                classes={'customer-heading'}
                value={'customer'} />
            </div>
            <div className="setup-info">
              <h4 className="desc-header">Material Information</h4>
              <div className="material-info">
                <DescriptionItem 
                  header={'Material: '}
                  value={'material'} />
                <DescriptionItem 
                  header={'Material Dimensions: '}
                  value={'material_dimensions'} />
              </div>
              <h4 className="desc-header">Work Holding</h4>
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
            </div>
          </div>
          <h4 className="desc-header">Tools</h4>
          {descriptionList}
        </div>);
    }
  }

  addTool() {
    let tools = this.state.tools
    tools.push({});
    this.setState({ tools });
  }

  parseTools() {
    let options = fluxStore.getAllToolsInCat('mill');
    options = options.map( tool => {
      let shown = tool.tool_data.diameter + '" ' + (typeof(tool.tool_data.tool_type) !== 'string' ? tool.tool_data.tool_type[0] : tool.tool_data.tool_type);
      return { value: tool._id, children: shown };
    });

    options.unshift({ value: 0, children: 'Select a Tool' });

    return options;
  }

  showMaterial(i) {
    let material = fluxStore.getFormValue('material', { subClass: 'tools', index: i });

    return material && material[0];
  }

  showFluteLength(i) {
    return fluxStore.getFormValue('flute_length', { subClass: 'tools', index: i });
  }

  getAdditionalParameters(i) {
    let toolId = fluxStore.getFormValue('tool', { subClass: 'tools', index: i })[0];

    let tool = fluxStore.getAllToolsInCat('mill').find( tool => {
      return tool._id === toolId;
    });

    fluxActions.updateForm({ material: tool.tool_data.material, flute_length: tool.tool_data.flute_length }, { subClass: 'tools', index: i});
    this.setState({ data: fluxStore.viewForm()});
  }

  descriptionToolsList() {
    // let options = this.parseTools();
    let headers = (<thead className="tool-row">
      <tr>
        <th>Tool</th>
        <th>Material</th>
        <th>Flute Length</th>
        <th>Tool Clearance</th>
        <th>Tool Life</th>
      </tr>
    </thead>);
    let tools = (<tr></tr>);
    if(fluxStore.viewForm().tools) {
      tools = fluxStore.viewForm().tools.map( (tool, i) => {
        let material = this.showMaterial(i),
            fluteLength = this.showFluteLength(i);
        return (<tr key={i} className="tool-row">
            <td>
              <a href="#"><DescriptionItem
                classes={'select-tool'}
                header={''}
                additionalData={{ subClass: 'tools', index: i, fillWithData: true }}
                value={'tool'} /></a>
            </td>
            <td>
              <span className="fixed-value" >{material}</span>
            </td>
            <td>
              <span className="fixed-value" >{fluteLength}"</span>
            </td>
            <td>
              <DescriptionItem
                classes={'tool-clearance'}
                header={''}
                units={'inches'}
                additionalData={{ subClass: 'tools', index: i }}
                value={'tool_clearance'} />
            </td>
            <td>
              <DescriptionItem
                classes={'tool-life'}
                header={''}
                units={'pieces'}
                additionalData={{ subClass: 'tools', index: i }}
                value={'tool_life'} />
            </td>
          </tr>);
      });
    }
    return (<table className={'setup-tools'}>
      {headers}
      <tbody>
        {tools}
      </tbody>
    </table>);
  }

  toolsList() {
    let options = this.parseTools();
    let headers = (<thead className="tool-row">
      <tr>
        <th>Tool</th>
        <th>Material</th>
        <th>Flute Length</th>
        <th>Tool Clearance</th>
        <th>Tool Life</th>
      </tr>
    </thead>);

    let tools = this.state.tools.map( (tool, i) => {
      let material = this.showMaterial(i),
          fluteLength = this.showFluteLength(i);
      return (<tr key={i} className="tool-row">
          <td>
            <EditableItem
              classes={'select-tool'}
              header={''}
              type={'select'}
              additionalFunction={() => {this.getAdditionalParameters(i)}}
              additionalData={{ subClass: 'tools', index: i, fillWithData: true }}
              name={'tool'}
              properties={options} />
          </td>
          <td><span className="fixed-value" >{material}</span></td>
          <td><span className="fixed-value" >{fluteLength}"</span></td>
          <td>
            <EditableItem
              classes={'tool-clearance'}
              header={''}
              units={'inches'}
              type={'math'}
              additionalData={{ subClass: 'tools', index: i }}
              name={'tool_clearance'} />
          </td>
          <td>
            <EditableItem
              classes={'tool-life'}
              header={''}
              units={'pieces'}
              type={'number'}
              additionalData={{ subClass: 'tools', index: i }}
              name={'tool_life'} />
          </td>
        </tr>);
    });

    return (<div>
      <table className={'setup-tools'}>
        {headers}
        <tbody>
          {tools}
        </tbody>
      </table>
      <button onClick={this.addTool} className='button small-button white-button'>Add Tool</button>
    </div>);
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
