import React, { Component } from 'react';
import OrderMill from '../Ordering/OrderMill';
import OrderLathe from '../Ordering/OrderLathe';
import OrderOther from '../Ordering/OrderOther';
import ShippedEditorModal from './ShippedEditorModal';
import fluxStore from '../../../Flux/fluxStore';
import LoadingBlock from '../../Main/LoadingBlock';

class Shipped extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      toolId: null,
      data: {},
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

  toggleModal(toolId) {
    this.setState({ toolId: toolId, editing: !this.state.editing });
  }

  componentWillMount() {    
    this.setState({ data: fluxStore.getShipped(this.props.category), loaded: true });

    fluxStore.on('allUpdated', () => {
      this.setState({ loaded: true });

    })
  }

  generateEditorModal() {
    if(this.state.editing) {
      return <ShippedEditorModal
              id={this.state.toolId}
              machine={this.props.category}
              toggleModal={this.toggleModal}
              toggleBig={this.props.toggleBig}
              triggerUpdate={this.get} />;
    } else {
      return '';
    }
  }

  showTools() {
    if(this.state.loaded) {
      switch(this.props.category) {
        default :
          return <OrderMill
                  toggleModal={this.toggleModal}
                  data={fluxStore.getShipped(this.props.category)}
                  source={'stock'}/>
        case 'lathe' :
          return <OrderLathe
                  toggleModal={this.toggleModal}
                  data={fluxStore.getShipped(this.props.category)}
                  source={'stock'}/>
        case 'other' :
          return <OrderOther
                  toggleModal={this.toggleModal}
                  data={fluxStore.getShipped(this.props.category)}
                  source={'stock'}/>
      }
    } else {
      return <LoadingBlock loadingMessage="Loading Inventory List" />;
    }
  }

  render() {
    let categories = this.showTools();
    let toolEditorModal = this.generateEditorModal();

    return (
      <div id="Pages/Purchased/Shipped">
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

export default Shipped;
