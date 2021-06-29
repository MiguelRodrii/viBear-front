import API from "../../../services";
import { gql } from "graphql-request";
import * as groupTypes from "../../constants/productsInventory/products.js";

export const createProduct =
  (amount, purchasePrice, salePrice, productDefinition) => async (dispatch) => {
    try {
      dispatch({
        type: groupTypes.CREATE_PRODUCT_LOADING,
        payload: { loading: true },
      });
      const response = await API.request(gql`
      mutation {
        createProduct(
          product: {
            initial_amount: ${amount}
            current_amount: ${amount}
            purchase_price: ${purchasePrice}
            sale_price: ${salePrice}
            product_definition_id: ${productDefinition.id}
          }
        ) {
          id
          purchase_price
          sale_price
          current_amount
          product_definition {
            id
            name
            product_type {
              name
              is_expirable
              iva_percentage {
                value
              }
            }
          }
        }
      }
    `);
      dispatch({
        type: groupTypes.CREATE_PRODUCT_SUCCESS,
        payload: {
          loading: false,
          success: true,
          createdProduct: response.createProduct,
        },
      });
      return response.createProduct.id;
    } catch (error) {
      console.log(error);
      dispatch({
        type: groupTypes.CREATE_PRODUCT_FAILED,
        payload: { loading: false, success: false },
      });
      return undefined;
    }
  };

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.GET_PRODUCTS_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      query {
        products {
          id
          purchase_price
          sale_price
          current_amount
          product_definition {
            id
            name
            product_type {
              name
              is_expirable
              iva_percentage {
                value
              }
            }
          }
        }
      }
    `);
    dispatch({
      type: groupTypes.GET_PRODUCTS_SUCCESS,
      payload: { loading: false, success: true, products: response.products },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.GET_PRODUCTS_FAILED,
      payload: { loading: false, success: false },
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.DELETE_PRODUCT_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      mutation {
        deleteProduct(id: ${productId})
      }
    `);
    if (response.deleteProduct) {
      dispatch({
        type: groupTypes.DELETE_PRODUCT_SUCCESS,
        payload: { loading: false, success: true, deletedProductId: productId },
      });
      return true;
    }
    dispatch({
      type: groupTypes.DELETE_PRODUCT_FAILED,
      payload: { loading: false, success: false },
    });
    return false;
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.DELETE_PRODUCT_FAILED,
      payload: { loading: false, success: false },
    });
    return false;
  }
};

export const updateProduct =
  (productId, productDefinitionId, currentAmount, purchasePrice, salePrice) =>
  async (dispatch) => {
    try {
      dispatch({
        type: groupTypes.UPDATE_PRODUCT_LOADING,
        payload: { loading: true },
      });
      const response = await API.request(gql`
      mutation {
        updateProduct(
          product: {
            id: ${productId}
            purchase_price: ${purchasePrice}
            sale_price: ${salePrice}
            current_amount: ${currentAmount}
            product_definition_id: ${productDefinitionId}
          }
        ) {
          id
          purchase_price
          sale_price
          current_amount
          product_definition {
            id
            name
            product_type {
              name
              is_expirable
              iva_percentage {
                value
              }
            }
          }
        }
      }
    `);
      dispatch({
        type: groupTypes.UPDATE_PRODUCT_SUCCESS,
        payload: {
          loading: false,
          success: true,
          updatedProduct: response.updateProduct,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: groupTypes.UPDATE_PRODUCT_FAILED,
        payload: {
          loading: false,
          success: true,
        },
      });
      return false;
    }
  };
