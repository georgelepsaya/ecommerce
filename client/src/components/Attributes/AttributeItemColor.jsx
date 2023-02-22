import React, { Component } from 'react';
import styled from 'styled-components';
import { selectItem } from '../../features/set_product/setProductSlice';
import withParams from '../withParams';

const Item = styled.div`
  height: 32px;
  width: 32px;
  border: 1px solid #1D1F22;
  box-sizing: border-box;
  margin-right: 12px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  background-color: ${props => props.bg};
  border: none;

  ${props => props.isWhite && `
    border: 1px solid #1D1F22;
  `}
`

const Picker = styled.div`
  border: 1px solid #5ECE7B;
  width: 36px;
  height: 36px;
  position: absolute;
`

class AttributeItemColor extends Component {
  render() {
    const attr = this.props.setProduct.product.attributes.find(obj => obj.name === this.props.name);
    const selected = attr.items.find(item => item.id === this.props.item.id).isSelected;
    const id = this.props.item.id;
    const name = this.props.name;
    if (this.props.item.value === "#FFFFFF") {
      return (
        <Item key={this.props.item.id} bg={this.props.item.value} isWhite={true} onClick={() => this.props.dispatch(selectItem({id, name}))}>
          {selected && <Picker />}
        </Item>
      )
    }
    return (
        <Item key={this.props.item.id} bg={this.props.item.value} onClick={() => this.props.dispatch(selectItem({id, name}))}>
          {selected && <Picker />}
        </Item>
    )
  }
}

export default withParams(AttributeItemColor, ["setProduct"], []);