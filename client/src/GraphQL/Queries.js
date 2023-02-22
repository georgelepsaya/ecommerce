import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query CategoriesQuery {
    categories {
      name
    }
  }
`;

export const GET_CATEGORY = gql`
  query($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          items {
            displayValue
            value
            id
          }
          name
          type
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        brand
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const GET_CURRENCIES = gql`
  query CurrenciesQuery {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_ATTRIBUTES = gql`
  query($input: CategoryInput) {
    category(input: $input) {
      products {
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;
