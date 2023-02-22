import React, { Component } from 'react';
import styled from 'styled-components';
import AttributeItemText from './AttributeItemText';
import AttributeItemColor from './AttributeItemColor';
import withParams from '../withParams';

const AttributeName = styled.h3`
  font-family: 'Roboto', sans-serif !important;
  font-weight: 700;
  font-size: 18px;
  margin-top: 43px;
`

const ItemContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`

class AttributeSet extends Component {
  render() {
    const items = this.props.attr.items;
    return (
      <>
        <AttributeName key={this.props.attr.id}>{this.props.attr.name.toUpperCase()}:</AttributeName>
        <ItemContainer>
          {items.map(item => {
            if (this.props.attr.name === "Color") {
              return <AttributeItemColor item={item} name={this.props.attr.name} key={item.id}/>
            }
            return <AttributeItemText item={item} name={this.props.attr.name} key={item.id}/>
          })}
        </ItemContainer>
      </>
    )
  }
}

export default withParams(AttributeSet, [], []);