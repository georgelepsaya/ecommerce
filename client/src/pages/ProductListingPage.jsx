import React, { Component } from 'react'
import styled from 'styled-components';
import cartIcon from "../icons/cart_icon_circle.svg";
import { newCartItem } from '../features/cart/cartSlice';
import withParams from '../components/withParams';
import FilterBar from '../components/FilterBar/FilterBar';
import { Link } from 'react-router-dom';

const CategoryName = styled.h1`
  font-weight: normal;
  text-transform: capitalize;
  margin-bottom: 103px;
  font-size: 42px;
`

const ProductsWrapper = styled.div`
  width: 65%;
  margin: 0 auto;
`

const RouteContainer = styled.div`
  width: 100%;
  min-height: 700px;
  display: flex;
`

const ProductImage = styled.img`
  width: 354px;
  height: 330px;
  object-fit: cover;
`

const ProductContainer = styled(Link)`
  width: 354px;
  height: 412px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  box-shadow: none;
  transition: 300ms;
  &:hover {
    box-shadow: 0px 4px 35px 8px hsla(210, 5%, 67%, 0.19);
    transition: box-shadow 300ms;
  }
  margin-bottom: 103px;
  cursor: pointer;
  text-decoration: none;
`

const ProductName = styled.h3`
  font-weight: 300;
  font-size: 18;
`

const ProductPrice = styled.p`
  font-weight: 500;
  font-size: 18;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Container = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  &:after {
    display: block;
    content: "";
    margin: 2px;
    flex: 999 999 auto;
  }
`

const Circle = styled.div`
  width: 52px;
  height: 52px;
  background-color: #5ECE7B;
  position: absolute;
  top: 318px;
  left: 290px;
  border-radius: 50%;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms;
  opacity: 0;
  box-shadow: 0px 4px 11px 2px rgba(29, 31, 34, 0.1);
  cursor: pointer;
`

const StockText = styled.p`
  position: absolute;
  font-weight: 400;
  font-size: 24px;
  color: #8D8F9A;
  top: 162px;
  right: 107px;
`

const MainContainer = styled.div`
  position: relative;
  &:hover {
    ${Circle} {
      visibility: visible;
      opacity: 1;
      transition: visibility 0ms, opacity 300ms linear;
    }
  }
  ${props => props.isOutOfStock && `
    opacity: 0.5;
  `}
`

const equalArrs = (arr1, arr2) => {
  if (arr1 === arr2) return true;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

const isInArr = (arr, ext) => {
  for (let a of ext) {
    if (equalArrs(a, arr)) {
      return true;
    }
  }
  return false;
}

export class ProductListingPage extends Component {
  addProductHandler(pr) {
    const product = JSON.parse(JSON.stringify(pr));
    product.amount = 1;
    for (const key in product) {
      if (Object.hasOwnProperty.call(product, key)) {
        if (key === "attributes") {
          for (const set of product[key]) {
            for (const item of set["items"]) {
              item.isSelected = false;
            }
          }
        }
      }
    }
    if (product.attributes.length === 0) {
      this.props.dispatch(newCartItem({product}));
    }
  }

  render() {
    const allProducts = this.props.categoryData.category.products;
    const prids = [];
    const curr = this.props.currency.currency;
    const params = [];
    const allProdAttrs = [];
    this.props.searchParams.forEach((value, key) => {
      if (value === "YesNo" || value === "NoYes") {
        params.push([key, "Yes"]);
        params.push([key, "No"]);
      } else {
        params.push([key, value]);
      }
    });
    allProducts.forEach(product => {
      const prodAttrs = [];
      product.attributes.forEach(attr => {
        attr.items.forEach(item => {
          let attrValue = item.displayValue;
          if (attr.name === "Color") {
            attrValue = item.displayValue.toLowerCase();
          }
          const attrPair = [attr.name.toLowerCase().replaceAll(" ", "_"), attrValue]
          prodAttrs.push(attrPair);
        })
      })
      allProdAttrs.push([product.id, prodAttrs]);
    })
    allProdAttrs.forEach(pr => {
      pr[1].forEach(atr => {
        if (isInArr(atr, params)) {
          if (!prids.includes(pr[0])) {
            prids.push(pr[0]);
          }
        }
      })
    })

    let products = allProducts.filter(pr => prids.includes(pr.id));
    if (params.length === 0) {
      products = allProducts;
    }
    return (
      <RouteContainer>
        <FilterBar />
        <ProductsWrapper>
          <CategoryName>{this.props.category}</CategoryName>
          <Container>
            {products.map(product => (
              <MainContainer key={product.id} isOutOfStock={!product.inStock}>
                <ProductContainer to={`/product/${product.id}`}>
                  {!product.inStock && <StockText>OUT OF STOCK</StockText>}
                  <ProductImage src={product.gallery[0]}/>
                  <ProductInfo>
                    <ProductName>{product.brand} {product.name}</ProductName>
                    <ProductPrice>{curr.symbol}{product.prices.find(price => price.currency.label === curr.label).amount}</ProductPrice>
                  </ProductInfo>
                </ProductContainer>
                <Circle onClick={() => this.addProductHandler(product)}>
                  <img src={cartIcon} style={{width: "24px"}} alt="cart-icon"/>
                </Circle>
              </MainContainer>
            ))}
          </Container>
        </ProductsWrapper>
      </RouteContainer>
    )
  }
}

export default withParams(ProductListingPage, ["currency"], ["category"]);