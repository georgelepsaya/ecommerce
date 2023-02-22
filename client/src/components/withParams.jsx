import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { calculateTotals } from "../features/cart/cartSlice";
import { GET_CATEGORIES, GET_CATEGORY, GET_CURRENCIES, GET_PRODUCT, GET_ATTRIBUTES } from "../GraphQL/Queries";

function withParams(Component, properties, toFetch) {
  
  return (props) => {

    const [searchParams, setSearchParams] = useSearchParams();

    // Calculating Totals
    const { cartItems } = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const { currency } = useSelector((state) => state.currency);

    useEffect(() => {
      dispatch(calculateTotals(currency));
    }, [cartItems]);

    // Defining the variables for queries
    let currencies = {};
    let categories = {};
    let category = {};
    let singleProduct = {};
    let attributes = {};
    let loadingCategories = false;
    let loadingCurrencies = false;
    let loadingCategory = false;
    let loadingProduct = false;
    let loadingAttributes = false;

    // Fetching currencies data
    if (toFetch.includes("currencies")) {
      const { data: currs, loading: loadingCurrs } = useQuery(GET_CURRENCIES);
      currencies = currs;
      loadingCurrencies = loadingCurrs;
    }

    // Fetching categories for navigation
    if (toFetch.includes("categories")) {
      const { data: cats, loading: loadingCats } = useQuery(GET_CATEGORIES);
      categories = cats;
      loadingCategories = loadingCats;
    }

    // Fetching products for only one category
    const curr_page = useSelector((state) => state.setPage);
    if (toFetch.includes("category")) {
      const { data: categoryData, loading: loadingCat } = useQuery(GET_CATEGORY, {
        variables: {
          input: {
            title: curr_page.page,
          },
        },
      });
      category = categoryData;
      loadingCategory = loadingCat;
    }

    // Fetching the single product data
    if (toFetch.includes("product")) {
      const { data: onlyProduct, loading: loadingPr } = useQuery(GET_PRODUCT, {
        variables: {
          id: useParams().id,
        },
      });
      singleProduct = onlyProduct;
      loadingProduct = loadingPr;
    }

    // Fetching the aattributes data
    if (toFetch.includes("attributes")) {
      const { data: allAttributes, loading: loadingAllAttr } = useQuery(GET_ATTRIBUTES, {
        variables: {
          input: {
            title: curr_page.page,
          },
        },
      });
      attributes = allAttributes;
      loadingAttributes = loadingAllAttr;
    }

    // selecting states
    let selectedProperties = {};
    properties.forEach(prop => {
      const selected = useSelector((state) => state[prop]);
      selectedProperties[prop] = selected;
    })

    if (loadingCategory || loadingProduct || loadingCategories || loadingCurrencies || loadingAttributes) {
      return ""
    } else {
      return <Component {...props} params={useParams()} dispatch={useDispatch()} {...selectedProperties} categories={categories} categoryData={category} onlyProduct={singleProduct} attributes={attributes} currs={currencies.currencies} setSearchParams={setSearchParams} searchParams={searchParams} />
    }
  }
}

export default withParams;