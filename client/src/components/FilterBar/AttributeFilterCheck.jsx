import React, { Component } from 'react';
import { AttributeTitle, AttributeContainer, CheckBoxGroup } from './styles.js';
import CheckBox from './CheckBox/CheckBox.jsx';

class AttributeFilterCheck extends Component {
  render() {
    return (
      <AttributeContainer key={this.props.k}>
        <AttributeTitle>{this.props.title}</AttributeTitle>
        <CheckBoxGroup>
          {this.props.attr[1].map(atr => {
            return <CheckBox key={atr.id} attr={atr} title={this.props.title} />;
          })}
        </CheckBoxGroup>
      </AttributeContainer>
    )
  }
}

export default AttributeFilterCheck;