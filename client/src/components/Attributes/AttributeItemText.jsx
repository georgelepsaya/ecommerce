import React, { Component } from 'react';
import styled from 'styled-components';
import { selectItem } from '../../features/set_product/setProductSlice';
import withParams from '../withParams';

const Item = styled.div`
  height: 45px;
  width: 63px;
  border: 1px solid #1D1F22;
  box-sizing: border-box;
  margin-right: 12px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => props.bg};
  
  ${props => props.isSelected && `
    background-color: #1D1F22;
    color: white;
  `}
`

class AttributeItemText extends Component {
  render() {
    const attr = this.props.setProduct.product.attributes.find(obj => obj.name === this.props.name);
    const selected = attr.items.find(item => item.id === this.props.item.id).isSelected;
    const id = this.props.item.id;
    const name = this.props.name;
    return (
      <Item key={this.props.item.id} onClick={() => this.props.dispatch(selectItem({id, name}))} isSelected={selected}>{this.props.item.value}</Item>
    )
  }
}

export default withParams(AttributeItemText, ["setProduct"], []);