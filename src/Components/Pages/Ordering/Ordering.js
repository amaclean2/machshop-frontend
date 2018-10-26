import React, { Component } from 'react';

import Purchased from '../Purchased/Purchased';
import ToBuy from './ToBuy';
import Shipped from '../Purchased/Shipped';

class Ordering extends Component {
  constructor() {
    super()
    this.state = {
      purchased: 0,
      subCat: 'mill'
    }
    this.togglePurchase=this.togglePurchase.bind(this);
    this.toggleSubCat=this.toggleSubCat.bind(this);
  }

  toggleSubCat(category) {
    this.setState({ subCat: category });
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
      return <Purchased
              category={this.state.subCat}
              toggleCat={this.toggleSubCat}
              toggleBig={this.togglePurchase} />
    } else if (this.state.purchased === 0) {
      return <ToBuy
              category={this.state.subCat}
              toggleCat={this.toggleSubCat}
              toggleBig={this.togglePurchase} />
    } else if (this.state.purchased === 2) {
      return <Shipped
              category={this.state.subCat}
              toggleCat={this.toggleSubCat}
              toggleBig={this.togglePurchase} />
    }
  }

  render() {
    let screen = this.showPurchaseState();

    return (
      <div id="Pages/Ordering/Ordering">
        <div className="toggle-pills under-inverted">

          <input name="ordering" id="shopping" type="radio" onChange={this.togglePurchase} checked={this.state.purchased === 0}/>
          <label htmlFor="shopping">Shopping</label>

          <input name="ordering" id="purchased" type="radio" onChange={this.togglePurchase} checked={this.state.purchased === 1} />
          <label htmlFor="purchased" >Purchased</label>

          <input name="ordering" id="shipped" type="radio" onChange={this.togglePurchase} checked={this.state.purchased === 2} />
          <label htmlFor="shipped" >Stock</label>

        </div>
        <div>
          {screen}
        </div>
      </div>
    );
  }
}

export default Ordering;
