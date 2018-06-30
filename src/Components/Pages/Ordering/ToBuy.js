import React, { Component } from 'react';
import OrderMill from './OrderMill';
import OrderLathe from './OrderLathe';
import OrderOther from './OrderOther';
import OrderEditorModal from './OrderEditorModal';
import fluxStore from '../../../Flux/fluxStore';
import * as fluxActions from '../../../Flux/actions';

class ToBuy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      toolId: null,
      data: [],
      loaded: false
    }
    this.toggle=this.toggle.bind(this);
    this.generateEditorModal=this.generateEditorModal.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
  }

  toggle(i) {
    this.props.toggleCat(i);
    this.setState({ data: fluxStore.getOrdering(i) });
  }

  componentWillMount() {
    if(fluxStore.getReady())
      this.setState({ data: fluxStore.getOrdering(this.props.category), loaded: true});

    fluxStore.on('change', () => {
      this.setState({ data: fluxStore.getOrdering(this.props.category), loaded: true});
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
          return <OrderMill toggleModal={this.toggleModal} data={this.state.data} source={source} />
        case 'lathe' :
          return <OrderLathe toggleModal={this.toggleModal} data={this.state.data} source={source} />
        case 'other' :
          return <OrderOther toggleModal={this.toggleModal} data={this.state.data} source={source} />
      }
    } else {
      return <span className='loading-screen'>You spent too much money! Just kidding, I'm loading...</span>;
    }
  }

  render() {
    let categories = this.showTools();
    let toolEditorModal = this.generateEditorModal();

    return (
      <div id="ToBuy">
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

export default ToBuy;
