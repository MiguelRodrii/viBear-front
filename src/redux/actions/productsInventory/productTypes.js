import API from "../../../services";
import { gql } from "graphql-request";
import * as groupTypes from "./types/productTypes";
import { showToast } from "../toast";

export const createProductType = (name, isExpirable, ivaPercentageId) => async (
  dispatch
) => {
  try {
    dispatch({
      type: groupTypes.CREATE_PRODUCT_TYPE_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      mutation {
        createProductType(
          productType: { name: "${name}", is_expirable: ${isExpirable}, iva_percentage_id: ${ivaPercentageId} }
        ) {
          id
        }
      }
    `);
    dispatch({
      type: groupTypes.CREATE_PRODUCT_TYPE_SUCCESS,
      payload: { loading: false, success: true },
    });
    dispatch(
      showToast(
        "success",
        "Tipo de producto: " +
          name +
          " ingresado de forma exitosa con id: " +
          response.createProductType.id +
          "."
      )
    );
    return true;
  } catch (error) {
    console.log(error);
    dispatch(
      showToast(
        "error",
        "El tipo de producto que ha especificado ya está registrado."
      )
    );
    dispatch({
      type: groupTypes.CREATE_PRODUCT_TYPE_FAILED,
      payload: { loading: false, success: false },
    });
    return false;
  }
};

export const getProductTypes = () => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.GET_PRODUCT_TYPES_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      query {
        productTypes {
          id
          name
          is_expirable
          iva_percentage {
            value
          }
        }
      }
    `);
    dispatch({
      type: groupTypes.GET_PRODUCT_TYPES_SUCCESS,
      payload: {
        loading: false,
        success: true,
        productTypes: response.productTypes,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.GET_PRODUCT_TYPES_FAILED,
      payload: {
        loading: false,
        success: false,
      },
    });
  }
};

export const deleteProductType = (productType) => async (dispatch) => {
  try {
    dispatch({
      type: groupTypes.DETELE_PRODUCT_TYPE_LOADING,
      payload: { loading: true },
    });
    const response = await API.request(gql`
      mutation {
        deleteProductType(id: ${productType.id})
      }
    `);
    if (response.deleteProductType) {
      dispatch({
        type: groupTypes.DETELE_PRODUCT_TYPE_LOADING,
        payload: { loading: true, success: true },
      });
      dispatch(getProductTypes());
      return true;
    } else {
      dispatch({
        type: groupTypes.DETELE_PRODUCT_TYPE_LOADING,
        payload: { loading: true, success: false },
      });
      return false;
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: groupTypes.DETELE_PRODUCT_TYPE_LOADING,
      payload: { loading: true, success: false },
    });
    return false;
  }
};
