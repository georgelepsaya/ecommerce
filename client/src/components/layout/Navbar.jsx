import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import brandIcon from "../../icons/brand_icon.svg";
import Currencies from '../Currencies';
import MiniCart from '../MiniCart/MiniCart';
import { updatePage } from '../../features/set_page/setPageSlice';
import { toggleMinicartModal } from '../../features/backdrops/minicartBackdrop';
import { toggleCurrenciesModal } from '../../features/backdrops/currenciesBackdrop';
import withParams from '../withParams';
import { clearParams } from '../../features/set_filters/setFiltersSlice';

const Container = styled.div`
  height: 80px;
  background-color: #fff;
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  padding: 0px 101px;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
`

const Left = styled.div`
  flex: 1;
  height: 100%;
  align-items: center;
  display: flex;
`
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const MenuItem = styled.div`
  font-size: 16px;
  height: 100%;
  display: flex;
  width: 97px;
  align-items: center;
  cursor: pointer;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  height: 100%;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  transition: 300ms;
  border-bottom: 0px solid #5ECE7B;
  text-transform: uppercase;
  transition: all 100ms;

  &.active {
    color: #5ECE7B;
    font-weight: 600;
    border-bottom: 2px solid #5ECE7B;
    transition: all 100ms;
  }
`

export class Navbar extends Component {
  render() {
    const pages = this.props.categories.categories;
    const amount = this.props.amount;
    return (
        <Container>
          <Wrapper>
            <Left>
              {pages.map(page => {
                return (
                  <MenuItem key={page.name} onClick={() => {
                    this.props.dispatch(updatePage(page.name));
                    this.props.dispatch(clearParams());
                    if (this.props.currenciesBackdrop.showCurrenciesBackdrop) {
                      this.props.dispatch(toggleCurrenciesModal());
                    }
                    if (this.props.minicartBackdrop.showMinicartBackdrop) {
                      this.props.dispatch(toggleMinicartModal())
                    }
                  }}>
                    <StyledNavLink to={`/${page.name}`}>
                      {page.name}
                    </StyledNavLink>
                  </MenuItem>
                )
              })}
            </Left>
            <Center>
              <img src={brandIcon} alt="brand-icon" />
            </Center>
            <Right>
              <Currencies mainRef={this.props.mainRef} />
            <MiniCart amount={amount} mainRef={this.props.mainRef} />
            </Right>
          </Wrapper>
        </Container>
    )
  }
}

export default withParams(Navbar, ["minicartBackdrop", "currenciesBackdrop"], ["categories"]);