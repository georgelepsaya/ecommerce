import React, { Component } from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  background-color: #1D1F22;
  height: 20px;
  width: 20px;
  border-radius: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 14px;
  position: absolute;
  top: -10px;
  right: -10px;
`

class Badge extends Component {
  render() {
    return (
      <>
        {this.props.badgeContent > 0 &&
          <Circle>{this.props.badgeContent}</Circle>
        }
      </>
    )
  }
}

export default Badge