import React, { Component } from 'react';
import CartItem from './CartItem';
import Total from './Total';
import withParams from '../withParams';

class CartItems extends Component {
  render() {
    return (
      <>
        {this.props.cart.cartItems.map(item => {
          return <CartItem key={item.id + `${Math.random()}`} product={item} />
        })}
        <Total total={this.props.cart.total} amount={this.props.cart.amount} />
      </>
    )
  }
}

export default withParams(CartItems, ["cart"], []);