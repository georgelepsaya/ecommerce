import React, { Component } from 'react';
import { FilterContainer, FilterTitle, SetFiltersContainer, ClearFiltersBtn } from './styles.js';
import AttributeFilterText from './AttributeFilterText.jsx';
import AttributeFilterColor from "./AttributeFilterColor.jsx";
import AttributeFilterCheck from './AttributeFilterCheck.jsx';
import withParams from '../withParams.jsx';
import { clearParams } from '../../features/set_filters/setFiltersSlice.js';

class FilterBar extends Component {
  render() {
    // getting attributes from HOC
    const products = this.props.attributes.category.products;
    // adding them in a readable way in a new object
    const attributes = {};
    products.forEach(attrs => {
      attrs.attributes.forEach(attr => {
        attributes[attr.name] = [attr.type, attr.items];
      })
    });
    return (
      <FilterContainer>
        <FilterTitle>Filter Products</FilterTitle>
        <SetFiltersContainer>
          {
            Object.keys(attributes).map((key, i) => {
              const attr = attributes[key];
              if (attr[0] === "text" && attr[1][0].value !== "Yes") {
                return (
                  <AttributeFilterText key={i} updateParamsObj={this.updateParamsObj} k={i} title={key} attr={attr} />
                )
              } else if (attr[0] === "swatch") {
                return (
                  <AttributeFilterColor key={i} k={i} title={key} attr={attr}/>
                )
              } else if (attr[0] === "text" && attr[1][0].value === "Yes") {
                return (
                  <AttributeFilterCheck key={i} k={i} title={key} attr={attr} />
                )
              } else {
                return <></>;
              }
            })
          }
        </SetFiltersContainer>
        <ClearFiltersBtn onClick={() => {
          this.props.dispatch(clearParams());
          this.props.setSearchParams({});
        }}>Clear Fitlers</ClearFiltersBtn>
      </FilterContainer>
    )
  }
}

export default withParams(FilterBar, [], ["attributes"]);