import React, { Component } from 'react';
import styled from 'styled-components';
import plusIcon from "../../icons/plus.svg";
import minusIcon from "../../icons/minus.svg";
import SlideRight from "../../icons/slide-right.svg"
import SlideLeft from "../../icons/slide-left.svg";
import { increase, decrease, removeItem } from '../../features/cart/cartSlice';
import withParams from '../withParams';

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E5E5;
  padding: 24px 0;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const View = styled.div`
  height: 288px;
  display: flex;
  flex-direction: row;
`

const Name = styled.h3`
  font-weight: 600;
  font-size: 30px;
`

const Price = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin-top: 20px;
`

const AttributeName = styled.h3`
  font-family: 'Roboto', sans-serif !important;
  font-weight: 700;
  font-size: 18px;
  margin-top: 20px;
`

const ItemContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`

const Item = styled.div`
  height: 45px;
  width: 63px;
  border: 1px solid #1D1F22;
  box-sizing: border-box;
  margin-right: 12px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => props.bg};

  ${props => props.isTextSelected && `
    background-color: #1D1F22;
    color: white;
  `}

  ${props => props.isWhite && `
    border: 1px solid #1D1F22 !important;
  `}

  ${props => props.isColorAttribute && `
    height: 32px;
    width: 32px;
    border: none;
  `}
`

const ChangeAmount = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ChangeAmountButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1D1F22;
  width: 45px;
  height: 45px;
  cursor: pointer;
`

const Amount = styled.p`
  font-weight: 500;
  font-size: 24px;
`

const ImgView = styled.img`
  width: 200px;
  height: 100%;
  object-fit: cover;
  margin-left: 24px;
`

const SliderContainer = styled.div`
  position: absolute;
  width: 56px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 16px;
  bottom: 16px;
`

const SliderButton = styled.div`
  cursor: pointer;
  background: rgba(0, 0, 0, 0.73);
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImgViewWrap = styled.div`
  height: 100%;
  position: relative;
`

const Picker = styled.div`
  border: 1px solid #5ECE7B;
  width: 36px;
  height: 36px;
  position: absolute;
`

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    }
  }

  leftClickHandler = () => {
    this.setState((prevState) => {
      if (prevState.imageIndex - 1 < 0) {
        return {imageIndex: this.product.gallery.length - 1};
      }
      return {imageIndex: prevState.imageIndex - 1};
    });
  }

  rightClickHandler = () => {
    this.setState((prevState) => {
      if (prevState.imageIndex + 1 > this.product.gallery.length - 1) {
        return {imageIndex: 0};
      }
      return {imageIndex: prevState.imageIndex + 1};
    });
  }

  product = this.props.product;

  render() {
    const product = this.props.product;
    const curr = this.props.currency.currency;
    return (
      <Container >
        <Info>
          <Name>{product.name}</Name>
          <Price>{curr.symbol}{product.prices.find(price => price.currency.label === curr.label).amount}</Price>
          {product.attributes.map(attr => {
            return (
              <div key={Math.random()}>
                <AttributeName key={attr.id}>{attr.name.toUpperCase()}:</AttributeName>
                <ItemContainer>
                  {attr.items.map(item => {
                    if (attr.name === "Color") {
                      if (item.value === "#FFFFFF") {
                        return <Item key={item.id} bg={item.value} isColorAttribute={true} isWhite={true}>
                          {item.isSelected && <Picker />}
                        </Item>
                      }
                      return <Item key={item.id} bg={item.value} isColorAttribute={true}>
                        {item.isSelected && <Picker />}
                      </Item>
                    }
                    return <Item key={item.id} isTextSelected={item.isSelected}>{item.value}</Item>
                  })}
                </ItemContainer>
              </div>
            )
          })}
        </Info>
        <View>
          <ChangeAmount>
            <ChangeAmountButton onClick={() => this.props.dispatch(increase(product))}>
              <img src={plusIcon} alt="plus-icon"/>
            </ChangeAmountButton>
            <Amount>{product.amount}</Amount>
            <ChangeAmountButton onClick={() => {
              if (product.amount === 1) {
                this.props.dispatch(removeItem(product));
                return;
              }
              this.props.dispatch(decrease(product))
            }}>
              <img src={minusIcon} alt="minus-icon"/>
            </ChangeAmountButton>
          </ChangeAmount>
          <ImgViewWrap>
            <ImgView src={product.gallery[this.state.imageIndex]} />
            {product.gallery.length > 1 &&
              <SliderContainer>
                <SliderButton onClick={() => this.leftClickHandler()} ><img src={SlideLeft} alt="slide-left"/></SliderButton>
                <SliderButton onClick={() => this.rightClickHandler()} ><img src={SlideRight} alt="slide-right"/></SliderButton>
              </SliderContainer>
            }
          </ImgViewWrap>
        </View>
      </Container>
    )
  }
}

export default withParams(CartItem, ["currency"], []);