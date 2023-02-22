import React, { Component } from 'react';
import styled from 'styled-components';
import AttributeSet from '../components/Attributes/AttributeSet';
import { setProduct } from '../features/set_product/setProductSlice';
import AddToCart from '../components/AddToCart';
import withParams from '../components/withParams';
import DOMPurify from "dompurify";

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`

const RouteContainer = styled.div`
  width: 85%;
  min-height: 700px;
`

const GalleryImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 40px;
  object-fit: cover;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ViewImage = styled.img`
  object-fit: contain;
  max-height: 511px;
  max-width: 610px;
`

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  margin-right: 118px;
`

const ProductName = styled.h2`
  font-weight: 600;
  font-size: 30px;
`

const ProductDescription = styled.div`
  margin-top: 20px;
  &, * {
    font-family: 'Roboto', sans-serif;
  }
`

const PriceTag = styled.h3`
  font-family: 'Roboto', sans-serif !important;
  font-weight: 700;
  font-size: 18px;
  margin-top: 43px;
`

const Price = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 5px;
`

class ProductDescriptionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: this.product.gallery[0],
    };
  }

  product = this.props.onlyProduct.product;

  imgClickHandler = (pic) => {
    this.setState({showImage: pic});
  }

  render() {
    const product = JSON.parse(JSON.stringify(this.product));
    product.amount = 1;
    const curr = this.props.currency.currency;
    const descriptionSafe = DOMPurify.sanitize(this.product.description);

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
    this.props.dispatch(setProduct(product));
    return (
      <RouteContainer>
      <Container>
        <ImagesContainer>
          <GalleryContainer>
            {this.product.gallery.map(pic => {
              return <GalleryImage onClick={() => this.imgClickHandler(pic)} key={Math.floor(Math.random()*1000000).toString()} src={pic} />
            })}
          </GalleryContainer>
          <ViewImage src={this.state.showImage} />
        </ImagesContainer>
        <ProductInfo>
          <ProductName>{this.product.brand} {this.product.name}</ProductName>
          {this.product.attributes.map(attr => {
            return <AttributeSet key={Math.floor(Math.random()*1000000).toString()} attr={attr} />
          })}
          <PriceTag>PRICE:</PriceTag>
          <Price>{curr.symbol}{product.prices.find(price => price.currency.label === curr.label).amount}</Price>
          <AddToCart isInStock={product.inStock}/>
          <ProductDescription
            dangerouslySetInnerHTML={{
            __html: descriptionSafe,
            }}
          ></ProductDescription>
        </ProductInfo>
      </Container>
      </RouteContainer>
    )
  }
}

export default withParams(ProductDescriptionPage, ["currency"], ["product"]);