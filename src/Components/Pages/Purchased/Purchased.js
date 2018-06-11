import React, { Component } from 'react';
import OrderMill from '../Ordering/OrderMill';
import OrderLathe from '../Ordering/OrderLathe';
import OrderOther from '../Ordering/OrderOther';
import PurchasedEditorModal from './PurchasedEditorModal';
import fluxStore from '../../../Flux/fluxStore';

class Purchased extends Component {
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
    this.get=this.get.bind(this);
  }

  get(refresh) {
    let category = refresh && refresh !== 'refresh' ? refresh : this.props.category;
  }

  toggle(i) {
    this.props.toggleCat(i);
  }

  componentWillReceiveProps(props) {
    this.get(props.category);
  }

  componentWillMount() {
    this.setState({ data: fluxStore.getPurchased(this.props.category)});
    
    fluxStore.on('change', () => {
      this.setState({ data: fluxStore.getPurchased(this.props.category), loaded: true});

    })
  }

  toggleModal(toolId) {
    this.setState({ toolId: toolId, editing: !this.state.editing });
  }

  generateEditorModal() {
    if(this.state.editing) {
      return <PurchasedEditorModal
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
          return <OrderMill toggleModal={this.toggleModal} data={this.state.data} noAdd={true} source={'ordering'} />
        case 'lathe' :
          return <OrderLathe toggleModal={this.toggleModal} data={this.state.data} noAdd={true} source={'ordering'} />
        case 'other' :
          return <OrderOther toggleModal={this.toggleModal} data={this.state.data} noAdd={true} source={'ordering'} />
      }
    } else {
      return <span className='loading-screen'>You spent too much money! Just kidding, I'm loading...</span>;
    }
  }

  componentDidMount() {
    this.get();
  }

  render() {
    let categories = this.showTools();
    let toolEditorModal = this.generateEditorModal();

    return (
      <div>
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

export default Purchased;
