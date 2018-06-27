import React, { Component } from 'react';
import OrderMill from '../Ordering/OrderMill';
import OrderLathe from '../Ordering/OrderLathe';
import OrderOther from '../Ordering/OrderOther';
import ShippedEditorModal from './ShippedEditorModal';
import fluxStore from '../../../Flux/fluxStore';
import * as fluxActions from '../../../Flux/actions';

class Shipped extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      toolId: null,
      data: {},
      loaded: false
    }
    this.toggle=this.toggle.bind(this);
    this.generateEditorModal=this.generateEditorModal.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
  }

  toggle(i) {
    this.props.toggleCat(i);
  }

  toggleModal(toolId) {
    this.setState({ toolId: toolId, editing: !this.state.editing });
  }

  componentWillMount() {    
    this.setState({ data: fluxStore.getShipped(this.props.category), loaded: true});

    fluxStore.on('change', () => {
      this.setState({ data: fluxStore.getShipped(this.props.category), loaded: true});

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
          return <OrderMill toggleModal={this.toggleModal} data={this.state.data} source={'stock'}/>
        case 'lathe' :
          return <OrderLathe toggleModal={this.toggleModal} data={this.state.data} source={'stock'}/>
        case 'other' :
          return <OrderOther toggleModal={this.toggleModal} data={this.state.data} source={'stock'}/>
      }
    } else {
      return <span className='loading-screen'>You spent too much money! Just kidding, I'm loading...</span>;
    }
  }

  render() {
    let categories = this.showTools();
    let toolEditorModal = this.generateEditorModal();

    return (
      <div id="Shipped">
        {toolEditorModal}
        <div className='toggle toggle-smaller'>
            <div onClick={() => {this.toggle('mill') }} className={(this.props.category === 'mill' ? 'toggled' : '')}>
                Mill
            </div>
            <div onClick={() => {this.toggle('lathe') }} className={(this.props.category === 'lathe' ? 'toggled' : '')}>
                Lathe
            </div>
            <div onClick={() => {this.toggle('other') }} className={(this.props.category === 'other' ? 'toggled' : '')}>
                Other
            </div>
        </div>
        <div>
            {categories}
        </div>
      </div>
    );
  }
}

export default Shipped;
