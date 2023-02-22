import React, { Component } from "react";
import ProductListingPage from "../../pages/ProductListingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import ProductDescriptionPage from "../../pages/ProductDescriptionPage";
import CartPage from "../../pages/CartPage";
import Footer from "./Footer";
import withParams from "../withParams";

const MainContainer = styled.main`
  margin-top: 80px;
  display: flex;
  justify-content: center;
`

class MainWrap extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
      return (
        <>
          <Navbar mainRef={this.myRef} />
          <MainContainer ref={this.myRef} id="main">
              <Routes>
                {this.props.categories.categories.map(category => {
                  return <Route key={Math.random()} path={`${category.name}`} element={<ProductListingPage category={`${category.name}`} />} />
                })}
                <Route path="/product/:id" element={<ProductDescriptionPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<Navigate to="/all" replace />} />
              </Routes>
          </MainContainer>
          <Footer />
        </>
      );
  }
};

export default withParams(MainWrap, [], ["categories"]);