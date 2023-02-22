import React, { Component } from 'react';
import styled from 'styled-components';
import { newCartItem } from '../features/cart/cartSlice';
import withParams from './withParams';

const AddButton = styled.button`
  width: 292px;
  background: rgba(94, 206, 123, 1);
  border: none;
  padding: 16px 32px;
  color: #fff;
  font-family: 'Raleway';
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin: 20px 0;
  ${props => props.isInactive && `
    opacity: 0.5;
    pointer-events: none;
  `}
`

class AddToCart extends Component {
  render() {
    const product = this.props.setProduct.product;
    let attrSelected = false;
    let attrItems = []
    let arr = [];
    product.attributes.forEach(attr => {
      attrItems = [];
      attr.items.forEach(item => {
        attrItems.push(item.isSelected);
      })
      if (attrItems.includes(true)) {
        arr.push(true);
      } else {
        arr.push(false);
      }
    })
    if (arr.includes(false)) {
      attrSelected = false;
    } else {
      attrSelected = true;
    }
    if (product.attributes.length === 0) {
      attrSelected = true;
    }
    return (
      <AddButton onClick={() => this.props.dispatch(newCartItem({ product }))} isInactive={!attrSelected || !this.props.isInStock}>ADD TO CART</AddButton>
    )
  }
}

export default withParams(AddToCart, ["setProduct"], []);