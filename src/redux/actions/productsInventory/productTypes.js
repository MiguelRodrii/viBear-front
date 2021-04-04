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
