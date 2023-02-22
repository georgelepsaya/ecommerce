import React, { Component } from 'react';
import CartItems from '../components/Cart/CartItems';
import styled from 'styled-components';

const Name = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 60px;
`

const RouteContainer = styled.div`
  width: 85%;
  min-height: 700px;
`

class CartPage extends Component {
  render() {
    return (
      <RouteContainer>
        <Name>CART</Name>
        <CartItems  />
      </RouteContainer>
    )
  }
}

export default CartPage