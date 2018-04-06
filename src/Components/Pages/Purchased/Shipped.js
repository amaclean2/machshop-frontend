import React, { Component } from 'react';
import OrderMill from '../Ordering/OrderMill';
import OrderLathe from '../Ordering/OrderLathe';
import OrderOther from '../Ordering/OrderOther';
import ShippedEditorModal from './ShippedEditorModal';

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
    this.get=this.get.bind(this);
  }

  get(refresh) {
    this.setState({ loaded: false });
    let url = sessionStorage.getItem('user').split(',')[2],
        id = sessionStorage.getItem('user').split(',')[1],
        category = refresh && refresh !== 'refresh' ? refresh : this.props.category,
        request = new Request(url + '/shopping/' + category + '?company_id=' + id, {
      method: 'GET'
    });

    fetch(request).then( response => {
        return response.json();
    }).then( data => {
      data = data.filter( item => {
        return item.tool_data.shopping === false && item.tool_data.purchased === false;
      });

      data.forEach( item => {
        for (var dataItem in item.tool_data) {
          item[dataItem] = item.tool_data[dataItem];
        }
        delete item.tool_data;
      });

      this.setState({ data: data, loaded: true });
      if(refresh && refresh === 'refresh')
        this.toggleModal('0');
    });
  }

  toggle(i) {
    this.props.toggleCat(i);
  }

  componentWillReceiveProps(props) {
    this.get(props.category);
  }

  toggleModal(toolId) {
    this.setState({ toolId: toolId, editing: !this.state.editing });
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

export default Shipped;
