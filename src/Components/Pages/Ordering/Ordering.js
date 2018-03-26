import React, { Component } from 'react';

import Purchased from '../Purchased/Purchased';
import ToBuy from './ToBuy';
import Shipped from '../Purchased/Shipped';

class Ordering extends Component {
  constructor() {
    super()
    this.state = {
      purchased: 0,
    }
    this.togglePurchase=this.togglePurchase.bind(this);
  }

  togglePurchase(e) {
    if(e.target.id === 'shopping')
      this.setState({ purchased: 0 });
    else if (e.target.id === 'purchased')
      this.setState({ purchased: 1});
    else if (e.target.id === 'shipped')
      this.setState({ purchased: 2});
  }

  showPurchaseState() {

    if(this.state.purchased === 1) {
      return <Purchased />
    } else if (this.state.purchased === 0) {
      return <ToBuy />
    } else if (this.state.purchased === 2) {
      return <Shipped />
    }
  }

  render() {
    let screen = this.showPurchaseState();

    return (
      <div>
        <div className="purchase-toggle">

          <input name="ordering" id="shopping" type="radio" onChange={this.togglePurchase} checked={this.state.purchased === 0}/>
          <label htmlFor="shopping" className={'purchase-label-one ' + (this.state.purchased === 0 ? 'checked-label' : '')}>Shopping</label>

          <input name="ordering" id="purchased" type="radio" onChange={this.togglePurchase} checked={this.state.purchased === 1} />
          <label className={(this.state.purchased === 1 ? 'checked-label' : '')} htmlFor="purchased" >Purchased</label>

          <input name="ordering" id="shipped" type="radio" onChange={this.togglePurchase} checked={this.state.purchased === 2} />
          <label htmlFor="shipped" className={(this.state.purchased === 2 ? 'checked-label' : '')}>Stock</label>

        </div>
        <div>
          {screen}
        </div>
      </div>
    );
  }
}

export default Ordering;
