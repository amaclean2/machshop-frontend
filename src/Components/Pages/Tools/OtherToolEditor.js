import React, { Component } from 'react';
import DescriptionItem from '../../Main/DescriptionItem';
import EditableItem from '../../Main/EditableItem';

class OtherToolEditor extends Component {
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

	toggleEdit() {
		this.setState({ editable: !this.state.editable });
	}

  viewInfo() {

  	if(!this.state.editable) {
  		return <div onClick={this.toggleEdit}>
        <DescriptionItem header={'Name: '} value={'name'} />
        <DescriptionItem header={'Description: '} value={'description'} />
        <DescriptionItem header={'Quantity: '} value={'count'} classes={this.props.order ? '' : 'gone'} />
        <DescriptionItem header={'Price: '} value={'price'} classes={ 'price ' + (this.props.order ? '' : 'gone')} />
        <DescriptionItem header={'Location: '} value={'location'} classes={this.props.order ? 'gone' : ''} />
        <DescriptionItem header={'Notes: '} value={'notes'} classes={'notes'} />
        {/*<DescriptionItem header={'Job Number: '} value={this.props.toolData.job_number}/>*/}
  		</div>
  	} else {
  		return <div>
        <EditableItem
          header={'Name: '}
          value={this.props.toolData.name}
          change={this.props.change}
          name={'name'}
          onClick={this.showTool} />
        <EditableItem
          header={'Description: '}
          change={this.props.change}
          name={'description'}
          onClick={this.showTool} />
        <EditableItem
          header={'Quantity: '}
          change={this.props.change}
          type={'number'}
          name={'count'}
          onClick={this.showTool}
          classes={(this.props.count !== 0 ? '' : 'gone')} />
        <EditableItem
          header={'Price: '}
          change={this.props.change}
          name={'price'}
          onClick={this.showTool}
          type={'price'}
          classes={this.props.order ? '' : 'gone'} />
        <EditableItem
          header={'Location: '}
          change={this.props.change}
          name={'location'}
          onClick={this.showTool}
          classes={this.props.order ? 'gone' : ''} />
        <EditableItem
          header={'Notes: '}
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
