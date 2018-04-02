import React, { Component } from 'react';
import OrderMill from '../Ordering/OrderMill';
import OrderLathe from '../Ordering/OrderLathe';
import OrderOther from '../Ordering/OrderOther';
import ShippedEditorModal from './ShippedEditorModal';

class Shipped extends Component {
  constructor() {
    super()
    this.state = {
      tools: 'mill',
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
    this.setState({ loaded: false });
    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        request = new Request(url + '/shopping/' + this.state.tools + '?company_id=' + id, {
      method: 'GET'
    });

    fetch(request).then( response => {
        return response.json();
    }).then( data => {
      data = data.filter( item => {
        return item.tool_data.shopping === false && item.tool_data.purchased === false;
      });

      this.setState({ data: data, loaded: true });
      if(refresh && refresh === 'refresh')
        this.toggleModal('0');
    });
  }

  toggle(i) {
    this.setState({ tools: i, loaded: false }, () => {
      this.get();
    });
  }

  toggleModal(toolId) {
    this.setState({ toolId: toolId, editing: !this.state.editing });
  }

  generateEditorModal() {
    if(this.state.editing) {
      return <ShippedEditorModal
              id={this.state.toolId}
              machine={this.state.tools}
              toggleModal={this.toggleModal}
              triggerUpdate={this.get} />;
    } else {
      return '';
    }
  }

  showTools() {
    if(this.state.loaded) {
      switch(this.state.tools) {
        default :
          return <OrderMill toggleModal={this.toggleModal} data={this.state.data} noQty={true}/>
        case 'lathe' :
          return <OrderLathe toggleModal={this.toggleModal} data={this.state.data} noQty={true}/>
        case 'other' :
          return <OrderOther toggleModal={this.toggleModal} data={this.state.data} noQty={true}/>
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
            <div onClick={() => {this.toggle('mill') }} className={(this.state.tools === 'mill' ? 'toggled' : '')}>
                Mill
            </div>
            <div onClick={() => {this.toggle('lathe') }} className={(this.state.tools === 'lathe' ? 'toggled' : '')}>
                Lathe
            </div>
            <div onClick={() => {this.toggle('other') }} className={(this.state.tools === 'other' ? 'toggled' : '')}>
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
