import React, { Component } from 'react';
import { CheckWrapper, CheckInput, CheckLabel, Container } from './styles';
import { updateParams } from '../../../features/set_filters/setFiltersSlice';
import withParams from '../../withParams';
import { removeParam } from '../../../features/set_filters/setFiltersSlice';

class CheckBox extends Component {
  checkHandler() {
    const title = this.props.title.toLowerCase().replaceAll(' ', '_');
    const value = this.props.attr.value;
    const paramsCheck = this.props.setFilters.paramsObj[title];
    if (!paramsCheck) {
      const newParam = {};
      newParam[title] = value;
      this.props.setSearchParams({ ...this.props.setFilters.paramsObj, ...newParam });
      this.props.dispatch(updateParams(newParam));
    } else if (paramsCheck && value === paramsCheck) {
      const delParams = { ...this.props.setFilters.paramsObj };
      this.props.dispatch(removeParam(title));
      delete delParams[title];
      this.props.setSearchParams(delParams);
    } else if (paramsCheck && value !== paramsCheck) {
      const newParam = {};
      let newVal = paramsCheck + value;
      if ((paramsCheck === "YesNo") || (paramsCheck === "NoYes")) {
        newVal = "YesNo".replace(value, "");
      }
      newParam[title] = newVal;
      this.props.setSearchParams({ ...this.props.setFilters.paramsObj, ...newParam });
      this.props.dispatch(updateParams(newParam));
    }
  }

  render() {
    const title = this.props.title.toLowerCase().replaceAll(' ', '_');
    return (
      <Container id={this.props.attr.value}>
      <CheckWrapper>
          <CheckInput onChange={() => this.checkHandler()} checked={(this.props.setFilters.paramsObj[title] === this.props.attr.value) || (this.props.setFilters.paramsObj[title] === "YesNo") || (this.props.setFilters.paramsObj[title] === "NoYes") ? true : false} />
          <CheckLabel>{this.props.attr.value}</CheckLabel>
      </CheckWrapper>
    </Container>
  )
  }
}


export default withParams(CheckBox, ["setFilters"], [])