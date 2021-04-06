import API from "../../../services";
import { gql } from "graphql-request";
import * as groupTypes from "./types/products";

export const createProduct = (
  amount,
  purchasePrice,
  salePrice,
  productDefinition
) => async (dispatch) => {
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
        }
      }
    `);
    dispatch({
      type: groupTypes.CREATE_PRODUCT_SUCCESS,
      payload: { loading: false, success: true },
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
