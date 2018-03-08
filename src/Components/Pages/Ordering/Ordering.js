import React, { Component } from 'react';

import Purchased from '../Purchased/Purchased';
import ToBuy from './ToBuy';

class Ordering extends Component {
  constructor() {
    super()
    this.state = {
      purchased: false
    }
    this.togglePurchase=this.togglePurchase.bind(this);
  }

  togglePurchase(e) {
    this.setState({ purchased: !this.state.purchased });
  }

  showPurchaseState() {
    if(this.state.purchased) {
      return <Purchased />
    } else {
      return <ToBuy />
    }
  }

  render() {
    let screen = this.showPurchaseState();

    return (
      <div>
        <div className="purchase-toggle">

          <input name="ordering" id="shopping" type="radio" onChange={this.togglePurchase} checked={!this.state.purchased}/>
          <label htmlFor="shopping" className={'purchase-label-one ' + (!this.state.purchased ? 'checked-label' : '')}>Shopping</label>

          <input name="ordering" id="purchased" type="radio" onChange={this.togglePurchase} checked={this.state.purchased} />
          <label className={(this.state.purchased ? 'checked-label' : '')} htmlFor="purchased" >Purchased</label>

        </div>
        <div>
          {screen}
        </div>
      </div>
    );
  }
}

export default Ordering;
