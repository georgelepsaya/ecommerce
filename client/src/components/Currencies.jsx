import React, { Component } from 'react';
import vectorIcon from "../icons/vector.svg";
import vectorUp from "../icons/vector_up.svg";
import styled from "styled-components";

import { updateCurrency } from '../features/currency/currencySlice';
import { calculateTotals } from '../features/cart/cartSlice';
import { toggleCurrenciesModal } from '../features/backdrops/currenciesBackdrop';
import { toggleMinicartModal } from '../features/backdrops/minicartBackdrop';
import withParams from './withParams';

const CurrenciesContainer = styled.div`
  position: relative;
  font-weight: 500;
  font-size: 18px;
`

const Currency = styled.span`
  font-size: 18;
  cursor: pointer;
`

const CurrenciesOptions = styled.div`
  position: absolute;
  top: 40px;
  right: -20px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  z-index: 1000;
  ${props => props.togglePosition && `
    position: fixed !important;
    top: 0px !important;
    right: 123px !important;
  `}
`

const Option = styled.div`
  width: 114px;
  height: 45px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  &:hover {
    background: #EEEEEE;
  }
  cursor: pointer;
`

const Backdrop = styled.div`
  position: fixed;
  margin-top: 80px;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.backdropHeight}px;
  z-index: 20;
`

const ArrowVector = styled.img`
  margin-left: 7px;
`

class Currencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurr: this.props.currency.currency,
      scrolled: 0,
      backdropHeight: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.setState(() => {
      return {backdropHeight: this.props.mainRef.current.scrollHeight}
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.backdropHeight !== this.props.mainRef.current.scrollHeight) {
      this.setState(() => {
      return {backdropHeight: this.props.mainRef.current.scrollHeight}
    })
    }
  }

  handleScroll = () => {
    this.setState({ scrolled: document.scrollingElement.scrollTop})
  }

  changeCurrHandler = (curr) => {
    this.setState({ showCurr: curr });
    this.props.dispatch(toggleCurrenciesModal());
    this.props.dispatch(calculateTotals(curr))
  }

  render() {
    return (
      <CurrenciesContainer>
        <Currency onClick={() => {
          this.props.dispatch(toggleCurrenciesModal());
          if (this.props.minicartBackdrop.showMinicartBackdrop) {
            this.props.dispatch(toggleMinicartModal());
          }
        }}>
          {this.state.showCurr.symbol}
          {this.props.currenciesBackdrop.showCurrenciesBackdrop ? <ArrowVector src={vectorUp}/> : <ArrowVector src={vectorIcon}/>}
        </Currency>
        {this.props.currenciesBackdrop.showCurrenciesBackdrop &&
          <>
            <Backdrop backdropHeight={this.state.backdropHeight + 230} onClick={() => this.props.dispatch(toggleCurrenciesModal())}/>
            <CurrenciesOptions togglePosition={this.state.scrolled > 70}>
              {this.props.currs.map(curr => {
                const label = curr.label;
                const symbol = curr.symbol;
                return <Option onClick={() => {
                  this.props.dispatch(updateCurrency({label, symbol}));
                  this.changeCurrHandler(curr);
                }} key={curr.label}>{curr.symbol} {curr.label}</Option>
              })}
            </CurrenciesOptions>
          </>
        }
      </CurrenciesContainer>
    )
  }
}

export default withParams(Currencies, ["currency", "currenciesBackdrop", "minicartBackdrop"], ["currencies"]);