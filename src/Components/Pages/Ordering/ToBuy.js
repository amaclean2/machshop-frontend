import React, { Component } from 'react';
import OrderMill from './OrderMill';
import OrderLathe from './OrderLathe';
import OrderOther from './OrderOther';
import OrderEditorModal from './OrderEditorModal';
import fluxStore from '../../../Flux/fluxStore';
import LoadingBlock from '../../Main/LoadingBlock';

class ToBuy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      toolId: null,
      data: [],
      loaded: false,
      tool: this.props.category
    }
    this.toggle=this.toggle.bind(this);
    this.generateEditorModal=this.generateEditorModal.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
  }

  toggle(e) {
    this.props.toggleCat(e.target.id);
    this.setState({ data: fluxStore.getOrdering(e.target.id), tool: e.target.id });
  }

  componentWillMount() {
    if(fluxStore.getReady('t'))
      this.setState({ loaded: true });

    fluxStore.on('allUpdated', () => {
      this.setState({ loaded: true });
    });
  }

  toggleModal(toolId) {
    if(toolId) {
      this.setState({ toolId: toolId, editing: !this.state.editing });
    } else {
      this.setState({ editing: !this.state.editing });
    }
  }

  generateEditorModal() {
    if(this.state.editing) {
      return <OrderEditorModal
              id={this.state.toolId}
              machine={this.props.category}
              toggleModal={this.toggleModal}
              toggleBig={this.props.toggleBig} />;
    } else {
      return '';
    }
  }

  showTools() {
    if(this.state.loaded) {

      let source = 'ordering';

      switch(this.props.category) {
        default :
          return <OrderMill
                  toggleModal={this.toggleModal}
                  data={fluxStore.getOrdering(this.props.category)}
                  source={source} />
        case 'lathe' :
          return <OrderLathe
                  toggleModal={this.toggleModal}
                  data={fluxStore.getOrdering(this.props.category)}
                  source={source} />
        case 'other' :
          return <OrderOther
                  toggleModal={this.toggleModal}
                  data={fluxStore.getOrdering(this.props.category)}
                  source={source} />
      }
    } else {
      return <LoadingBlock loadingMessage="Loading Shopping List" />;
    }
  }

  render() {
    let categories = this.showTools();
    let toolEditorModal = this.generateEditorModal();

    return (
      <div id="Ordering/ToBuy">
        {toolEditorModal}
        <div className='toggle-pills inverted'>
            <input type="radio" name="dept" id="mill" onChange={this.toggle} checked={this.state.tool === 'mill' } />
            <label htmlFor="mill">Mill</label>

            <input type="radio" name="dept" id="lathe" onChange={this.toggle} checked={this.state.tool === 'lathe' } />
            <label htmlFor="lathe">Lathe</label>

            <input type="radio" name="dept" id="other" onChange={this.toggle} checked={this.state.tool === 'other' } />
            <label htmlFor="other">Other</label>
        </div>
        <div>
            {categories}
        </div>
      </div>
    );
  }
}

export default ToBuy;
