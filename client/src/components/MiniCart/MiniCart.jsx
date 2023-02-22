import React, { Component } from 'react';
import styled from 'styled-components';
import cartIcon from "../../icons/cart_icon.svg";
import MiniCartItem from './MiniCartItem';
import Badge from './Badge';
import { toggleMinicartModal } from '../../features/backdrops/minicartBackdrop';
import { toggleCurrenciesModal } from '../../features/backdrops/currenciesBackdrop';
import withParams from '../withParams';
import { NavLink } from 'react-router-dom';

const CartButton = styled.a`
  display: flex;
  margin-left: 22px;
  cursor: pointer;
`

const MiniCartContainer = styled.div`
  position: relative;
`

const ModalContainer = styled.div`
  position: absolute;
  min-width: 325px;
  background-color: #fff;
  top: 50px;
  right: -30px;
  z-index: 999;
  padding: 32px 16px;
  overflow-y: scroll;
  max-height: 677px;
  ${props => props.togglePosition && `
    position: fixed !important;
    top: 0px !important;
    right: 71px !important;
  `}
`

const MiniCartHeader = styled.h3`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 32px;
`

const Backdrop = styled.div`
  position: fixed;
  margin-top: 80px;
  top: ${props => -props.togglePosition}px;
  left: 0;
  width: 100%;
  height: ${props => props.backdropHeight}px;
  z-index: 20;
  background-color: rgba(57, 55, 72, 0.22);
`

const TotalText = styled.p`
  font-weight: 500;
  font-size: 16px;
  font-family: 'Roboto';
`

const TotalAmount = styled.p`
  font-weight: 700;
  font-size: 16px;
`

const TotalContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ViewBagButton = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  font-weight: 600;
  font-size: 14px;
  min-width: 90px;
  background: #FFFFFF;
  border: 1px solid #1D1F22;
  margin-right: 15px;
`

const CheckOutButton = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  font-weight: 600;
  font-size: 14px;
  min-width: 90px;
  background: #5ECE7B;
  color: #fff;
  pointer-events: none;
`

const CartImg = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: 0,
      backdropHeight: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.backdropHeight !== this.props.mainRef.current.scrollHeight) {
      this.setState(() => {
        return {backdropHeight: this.props.mainRef.current.scrollHeight}
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.setState(() => {
      return {backdropHeight: this.props.mainRef.current.scrollHeight}
    })
  }

  // only using document once to get a scrollTop value, everything else is done with refs
  handleScroll = () => {
    this.setState({ scrolled: document.scrollingElement.scrollTop });
  }

  render() {
    const curr = this.props.currency.currency;
    return (
      <MiniCartContainer>
        <CartButton onClick={() => {
          this.props.dispatch(toggleMinicartModal());
          if (this.props.currenciesBackdrop.showCurrenciesBackdrop) {
            this.props.dispatch(toggleCurrenciesModal());
          }
        }}>
          <CartImg>
            <img src={cartIcon} alt="cart-icon"/>
            <Badge badgeContent={this.props.cart.amount}/>
          </CartImg>
        </CartButton>
        {this.props.minicartBackdrop.showMinicartBackdrop && 
          <>
          <Backdrop togglePosition={this.state.scrolled} backdropHeight={this.state.backdropHeight + 230} onClick={() => this.props.dispatch(toggleMinicartModal())}/>
          <ModalContainer togglePosition={this.state.scrolled > 75}>
            <MiniCartHeader><b>My Bag</b>, {this.props.cart.amount} items</MiniCartHeader>
            {this.props.cart.cartItems.map(item => {
              return <MiniCartItem product={item} key={item.id + `${Math.random()}`}/>
            })}
            <TotalContainer>
              <TotalText>Total</TotalText>
              <TotalAmount>{curr.symbol}{this.props.cart.total.toFixed(2)}</TotalAmount>
            </TotalContainer>
            <ButtonsContainer>
              <ViewBagButton to="/cart" onClick={() => {this.props.dispatch(toggleMinicartModal())}}>VIEW BAG</ViewBagButton>
              <CheckOutButton to="/checkout">CHECK OUT</CheckOutButton>
            </ButtonsContainer>
          </ModalContainer>
          </>
        }
      </MiniCartContainer>
    )
  }
}

export default withParams(MiniCart, ["minicartBackdrop", "currenciesBackdrop", "currency", "cart"], []);