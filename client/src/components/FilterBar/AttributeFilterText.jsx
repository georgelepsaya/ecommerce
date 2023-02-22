import React, { Component } from 'react';
import arrow from "../../icons/arrow-down.svg";
import { AttributeSelect, AttributeOption, SelectFilter, SelectIcon, AttributeTitle, AttributeContainer } from './styles.js';
import { updateParams, removeParam } from '../../features/set_filters/setFiltersSlice';
import withParams from '../withParams';

class AttributeFilterText extends Component {

  handleSelectAttr(e) {
    const updObj = {};
    const keyParam = this.props.title.toLowerCase().replaceAll(' ', '_');
    if (e.target.value !== "") {
      updObj[keyParam] = e.target.value;
      this.props.dispatch(updateParams(updObj));
      this.props.setSearchParams({ ...this.props.setFilters.paramsObj, ...updObj });
    } else {
      const parObj = {...this.props.setFilters.paramsObj};
      this.props.dispatch(removeParam(keyParam));
      delete parObj[keyParam];
      this.props.setSearchParams({ ...parObj });
    }
  }

  render() {
    const title = this.props.title.toLowerCase().replaceAll(' ', '_');
    return (
      <AttributeContainer key={this.props.k}>
        <AttributeTitle>{this.props.title}</AttributeTitle>
          <SelectFilter>
          <AttributeSelect onChange={(e) => this.handleSelectAttr(e)} value={Object.keys(this.props.setFilters.paramsObj).length !== 0 ? this.props.setFilters.paramsObj[title] : ""}>
            <AttributeOption value="">Select {this.props.title}</AttributeOption>
              {
                this.props.attr[1].map(atr => {
                  return (
                    <AttributeOption key={atr.id}>{atr.displayValue}</AttributeOption>
                  )
                })
              }
          </AttributeSelect>
          <SelectIcon src={arrow} />
        </SelectFilter>
      </AttributeContainer>
    )
  }
}

export default withParams(AttributeFilterText, ["setFilters"], []);