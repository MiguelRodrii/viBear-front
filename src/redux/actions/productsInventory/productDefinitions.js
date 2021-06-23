import API from "../../../services";
import { gql } from "graphql-request";
import * as groupTypes from "../../constants/productsInventory/productDefinitions.js";

export const createProductDefinition =
  (name, description, productTypeId) => async (dispatch) => {
    try {
      dispatch({
        type: groupTypes.CREATE_PRODUCT_DEFINITION_LOADING,
        payload: { loading: true },
      });
      const variables = { description: description };
      const response = await API.request(
        gql`
      mutation CreateProductDefinition($description: String!) {
        createProductDefinition(
          productDefinition: { name: "${name}", description: $description, product_type_id: ${productTypeId} }
        ) {
          id
          name
          description
          product_type {
            id
            name
            is_expirable
            iva_percentage {
              value
            }
          }
        }
      }
    `,
        variables
      );
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
          description
          product_type {
            id
            name
            is_expirable
            iva_percentage {
              value
            }
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

export const deleteProductDefinition =
  (productDefinition) => async (dispatch) => {
    try {
      dispatch({
        type: groupTypes.DELETE_PRODUCT_DEFINITION_LOADING,
        payload: { loading: true },
      });
      const response = API.request(gql`
      mutation {
        deleteProductDefinition(id: ${productDefinition.id})
      }
    `);
      if (response) {
        dispatch({
          type: groupTypes.DELETE_PRODUCT_DEFINITION_SUCCESS,
          payload: {
            loading: false,
            success: true,
            deletedProductDefinitionId: productDefinition.id,
          },
        });
        return true;
      }
      dispatch({
        type: groupTypes.DELETE_PRODUCT_DEFINITION_FAILED,
        payload: { loading: false, success: false },
      });
      return false;
    } catch (error) {
      console.log(error);
      dispatch({
        type: groupTypes.DELETE_PRODUCT_DEFINITION_FAILED,
        payload: { loading: false, success: false },
      });
      return false;
    }
  };

export const updateProductDefinition =
  (productDefinition) => async (dispatch) => {
    try {
      dispatch({
        type: groupTypes.UPDATE_PRODUCT_DEFINITION_LOADING,
        payload: { loading: true },
      });
      const variables = { description: productDefinition.description };
      const response = await API.request(
        gql`
      mutation UpdateProductDefinition($description: String!) {
        updateProductDefinition(
          productDefinition: {
            id: ${productDefinition.id}
            name: "${productDefinition.name}"
            description: $description
            product_type_id: ${productDefinition.product_type.id}
          }
        ) {
          id
          name
          description
          product_type {
            id
            name
            is_expirable
            iva_percentage {
              value
            }
          }
        }
      }
    `,
        variables
      );
      dispatch({
        type: groupTypes.UPDATE_PRODUCT_DEFINITION_SUCCESS,
        payload: {
          loading: false,
          success: true,
          updatedProductDefinition: response.updateProductDefinition,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: groupTypes.UPDATE_PRODUCT_DEFINITION_FAILED,
        payload: { loading: false, success: false },
      });
      return false;
    }
  };
