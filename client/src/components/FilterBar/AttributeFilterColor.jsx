import React, { Component } from 'react';
import { AttributeTitle, AttributeContainer, ColorOption, ColorsPick, Picker } from './styles.js';
import withParams from '../withParams.jsx';
import { updateParams, removeParam } from '../../features/set_filters/setFiltersSlice.js';

class AttributeFilterColor extends Component {

  handleColorPick(value) {
    const parObj = {...this.props.setFilters.paramsObj};
    if (parObj.color !== value) {
      this.props.dispatch(updateParams({ color: value }));
      this.props.setSearchParams({...parObj, color: value});
    } else {
      this.props.dispatch(removeParam("color"));
      delete parObj["color"];
      this.props.setSearchParams(parObj);
    }
  }

  render() {
    return (
      <AttributeContainer key={this.props.k}>
        <AttributeTitle>{this.props.title}</AttributeTitle>
        <ColorsPick>
          {
            this.props.attr[1].map(atr => {
              return (
                <ColorOption onClick={() => this.handleColorPick(atr.displayValue.toLowerCase())} key={atr.id} bg={atr.value} isWhite={atr.displayValue === "White"}>
                  {this.props.setFilters.paramsObj.color === atr.displayValue.toLowerCase() && <Picker />}
                </ColorOption>
              )
            })
          }
        </ColorsPick>
      </AttributeContainer>
    )
  }
}

export default withParams(AttributeFilterColor, ["setFilters"], []);