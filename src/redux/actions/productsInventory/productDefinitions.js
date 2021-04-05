import API from "../../../services";
import { gql } from "graphql-request";
import * as groupTypes from "./types/productDefinitions";

export const createProductDefinition = (
  name,
  description,
  productTypeId
) => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.CREATE_PRODUCT_DEFINITION_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      mutation {
        createProductDefinition(
          productDefinition: { name: "${name}", description: "${description}", product_type_id: ${productTypeId} }
        ) {
          id
          name
          description
          product_type {
            id
            name
          }
        }
      }
    `);
    dispatch({
      type: groupTypes.CREATE_PRODUCT_DEFINITION_SUCCESS,
      payload: {
        loading: false,
        success: true,
        createdProductDefinition: response.createProductDefinition,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.CREATE_PRODUCT_DEFINITION_FAILED,
      payload: {
        loading: false,
        success: false,
      },
    });
    return false;
  }
};

export const getProductDefinitions = () => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.GET_PRODUCT_DEFINITIONS_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      query {
        productDefinitions {
          id
          name
          product_type {
            id
            name
            is_expirable
          }
        }
      }
    `);
    dispatch({
      type: groupTypes.GET_PRODUCT_DEFINITIONS_SUCCESS,
      payload: {
        loading: false,
        success: true,
        productDefinitions: response.productDefinitions,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.GET_PRODUCT_DEFINITIONS_FAILED,
      payload: { loading: false, success: false },
    });
  }
};
